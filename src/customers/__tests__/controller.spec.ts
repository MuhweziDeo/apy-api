import request from 'supertest';
import app from '../../app';
import db from '../../db';

describe('Customer controller', () => {
    it('should create calculation for user', async () => {
        // expected value 0.051162
        const response = await request(app)
            .post('/api/v1/customers/calculate-apy')
            .send({
                deposit: 100,
                interestRate: 0.05,
                yearlyCompoundedTimes: 12,
                customerId: '43321122',
            })
            .expect(201);
        expect(response.body.message).toBe('Calculations Saved');
        expect(response.body.data.APY).toBe('0.051162');
    });

    it('should show error incase a parameter is missing', async () => {
        // deposit was removed
        const response = await request(app)
            .post('/api/v1/customers/calculate-apy')
            .send({
                interestRate: 0.05,
                yearlyCompoundedTimes: 12,
                customerId: '43321122',
            })
            .expect(400);
        expect(response.body.message).toBe('Validation failed');
    });

    it('should retrive details from database if customerId exist', async () => {
        // create dummy customer with Id 12345
        await request(app)
            .post('/api/v1/customers/calculate-apy')
            .send({
                deposit: 100,
                interestRate: 0.05,
                yearlyCompoundedTimes: 12,
                customerId: '12345',
            })
            .expect(201);

        const response = await request(app)
            .get('/api/v1/customers/12345')
            .expect(200);
        expect(response.body.data.length).toBe(1);
    });

    it('should return empty list if customer calcutions donot exist', async () => {
        // create dummy customer with Id 12345

        const response = await request(app)
            .get('/api/v1/customers/903')
            .expect(200);
        expect(response.body.data.length).toBe(0);
    });

    it('should return nextPage as null if no more records for the next page', async () => {
        // limit is 10 by default since there is only one customer with id 12345 there is no next page
        const response = await request(app)
            .get('/api/v1/customers/12345')
            .expect(200);
        expect(response.body.nextPage).toBe(null);
    });

    it('should return nextPage number if there are more calculations for customers to show', async () => {
        // limit is 1 since there are two customer calculations with ids 43321122;
        const response = await request(app)
            .get('/api/v1/customers/43321122?page=1&limit=1')
            .expect(200);
        expect(response.body.nextPage).toBe(2);
    });
});

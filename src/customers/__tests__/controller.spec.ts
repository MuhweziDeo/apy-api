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
});

import { Request, Response } from 'express';
import db from '../db';
import { cacheItem, getCachedItem } from '../helpers/cache';

export const calculateAPY = (req: Request, res: Response) => {
    //Assumptions
    // There is an exciting customers table and customerId is foreign key
    const { yearlyCompoundedTimes, interestRate, deposit, customerId } =
        req.body;

    const APY = (
        Math.pow(
            1 + interestRate / yearlyCompoundedTimes,
            yearlyCompoundedTimes
        ) - 1
    ).toFixed(6);

    const amountPayable = deposit + deposit * Number(APY);

    const query = db.prepare(
        `insert into calculations (customerId, yearlyCompoundTimes, interestRate, deposit, apy, total) values (?,?,?,?,?,?)`,
        [
            customerId,
            yearlyCompoundedTimes,
            interestRate,
            deposit,
            APY,
            amountPayable,
        ]
    );
    return query.run((error) => {
        if (error) {
            return res.status(500).send({
                message: 'Something went wrong',
                success: false,
                error,
            });
        }
        return res.status(201).send({
            data: {
                customerId,
                yearlyCompoundedTimes,
                interestRate,
                deposit,
                APY,
                total: amountPayable,
            },
            message: 'Calculations Saved',
        });
    });
};

export const retrieveCustomerCalculations = (req: Request, res: Response) => {
    const { customerId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const offset = Number(limit) * (Number(page) - 1);
    let sql = `SELECT * FROM calculations WHERE customerId = ? LIMIT ${limit} OFFSET ${offset}`;
    const cachedResults = getCachedItem(`calculations_${page}`);
    if(cachedResults) {
        const result = JSON.parse(cachedResults);
        return res.send({
            data: result,
            nextPage: result.length === Number(limit) ? Number(page) + 1 : null,
            currentPage: page,
            showingCachedResults: true
        })
    }

    return db.all(sql, [customerId], (error, result) => {
        if (error) {
            return res.status(500).send({
                message: 'Something went wrong',
                success: false,
                error,
                customerId,
            });
        }

        if(result.length) {
            cacheItem(`calculations_${page}`, JSON.stringify(result));
        }

        return res.send({
            data: result,
            nextPage: result.length === Number(limit) ? Number(page) + 1 : null,
            currentPage: page,
        });
    });
};

export const deleteCustomerCalculations = (req: Request, res: Response) => {
    const { customerId } = req.params;
    let sql = `DELETE FROM calculations WHERE customerId = ?`;

    return db.all(sql, [customerId], (error, result) => {
        if (error) {
            return res.status(500).send({
                message: 'Something went wrong',
                success: false,
                error,
                customerId,
            });
        }

        return res.send({
            data: result,
            message: 'Successfully deleted all records'
        });
    });

}

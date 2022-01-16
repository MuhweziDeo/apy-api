import { Request, Response } from 'express';
import db from '../db';

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
        'insert into calculations(customerId, yearlyCompoundTimes, interestRate, deposit, apy, total)' +
            'values (?,?,?,?,?,?)',
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
            return res
                .status(500)
                .send({
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

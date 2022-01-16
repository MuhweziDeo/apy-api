import { Router } from 'express';
import { calculateAPY, deleteCustomerCalculations, retrieveCustomerCalculations } from './controller';
import { Joi, Segments, celebrate } from 'celebrate';
const router = Router();

router.post(
    '/calculate-apy',
    celebrate(
        {
            [Segments.BODY]: Joi.object().keys({
                yearlyCompoundedTimes: Joi.number().required().max(12),
                interestRate: Joi.number().required(),
                customerId: Joi.string().required(),
                deposit: Joi.number().required(),
            }),
        },
        { abortEarly: false }
    ),
    calculateAPY
);

router.get('/:customerId', retrieveCustomerCalculations);

router.delete('/:customerId', deleteCustomerCalculations);

export default router;

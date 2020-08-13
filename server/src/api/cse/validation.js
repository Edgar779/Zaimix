import * as Joi from 'joi';

import APIError from '../../services/APIError.js';

import { getErrorResponse, getResponse } from '../mainModels.js';


export const editCse = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            cityId: Joi.string().required(),
            day: Joi.any(),
            address: Joi.any(),
            shipment: Joi.string().required(),
            urgency: Joi.string().required(),
            typeDelivery: Joi.string().required()

        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, 'editCse bank function in cse/validation.js');
        res.status(500).send(getErrorResponse());
    }

};
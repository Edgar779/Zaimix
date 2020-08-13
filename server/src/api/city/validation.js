import * as Joi from 'joi';

import APIError from '../../services/APIError.js';

import { getErrorResponse, getResponse } from '../mainModels.js';


export const editCities = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            id: Joi.string().required(),
            delivery: Joi.string().required(),

        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, 'create bank function in city/validation.js');
        res.status(500).send(getErrorResponse());
    }

};

export const addComment = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            cityId: Joi.string().required(),
            comment: Joi.string().required(),

        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, 'create bank function in city/validation.js');
        res.status(500).send(getErrorResponse());
    }

};
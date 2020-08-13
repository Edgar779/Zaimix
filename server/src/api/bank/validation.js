import * as Joi from 'joi';

import APIError from '../../services/APIError.js';

import { getErrorResponse, getResponse } from '../mainModels.js';


export const createBank = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            id: Joi.any().required(),
            officialName: Joi.string().required(),
            localName: Joi.string().required(),
            authToken: Joi.string().required(),
            active: Joi.boolean().required(),

        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, 'create bank function in bank/validation.js');
        res.status(500).send(getErrorResponse());
    }

};
export const updateBank = async (req, res, next) => {
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            _id: Joi.string().required(),
            officialName: Joi.string().required(),
            localName: Joi.string().required(),
            authToken: Joi.string().required(),
            active: Joi.boolean().required()
        });

        const result = Joi.validate(data, schema);
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }
        return next();
    }
    catch (e) {
        new APIError(e, 500, "updateBan function in bank/validation")
        res.status(500).send(getErrorResponse());
    }
}


export const createProduct = async (req, res, next) =>{
    try {
        const data = req.body;
        const schema = Joi.object().keys({
            productId: Joi.string().required(),
            name: Joi.string().required(),
            document: Joi.boolean().required(),
            print: Joi.number().required(),
            bankId: Joi.string().required()
        });

        const result = Joi.validate(data, schema);
        
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        
        }
        
        return next();
    
    }
    catch (e) {
        new APIError(e, 500, "createProduct function in bank/validation")
        res.status(500).send(getErrorResponse());
    }
}

export const getProduct = async (req, res, next) =>{
    try {
        const data = req.query;

        const schema = Joi.object().keys({
            bankId: /^[0-9a-fA-F]{24}$/,
        });

        const result = Joi.validate(data, schema);

        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }

        return next();

    }
    catch (e) {
        new APIError(e, 500, "createProduct function in bank/validation")
        res.status(500).send(getErrorResponse());
    }
}

export const updateProduct = async (req, res, next) =>{
    try {
        const data = req.body;

        const schema = Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.any(),
            print: Joi.any(),
            document: Joi.any()
        });

        const result = Joi.validate(data, schema);

        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
        }

        return next();

    }
    catch (e) {
        new APIError(e, 500, "createProduct function in bank/validation")
        res.status(500).send(getErrorResponse());
    }
}
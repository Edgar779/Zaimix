import * as Joi from 'joi';

import APIError from '../../services/APIError.js';

import { getErrorResponse, getResponse } from '../mainModels.js';

export const updateWorker = async (req, res, next) => {
   
    try {
   
        const data = req.body;
   
        const schema = Joi.object().keys({
            id: Joi.string().required(),
            name: Joi.string().required(),
            login: Joi.string().required(),
            role: Joi.number().required(),
            password: Joi.any()
        });

        const result = Joi.validate(data, schema);
       
        if (result.error) {
            return res.send(getResponse(false, result.error.details[0].message));
       
        }
       
        return next();
    
    }
    catch (e) {
        new APIError(e, 500, 'updateWorker function in workers/validation.js');
        res.status(500).send(getErrorResponse());
    }

};

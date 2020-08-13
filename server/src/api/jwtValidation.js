import * as jwt from 'jsonwebtoken';

// import AdminSchema from '../schemas/index.js';

import APIError from '../services/APIError';
import mainConfig from '../env';
// import { token } from 'morgan';
// import { getResponse, IResponseModel, getErrorResponse } from './mainModels';

// import { Request, Response, NextFunction } from 'express';
// import { IRequest } from './mainModels';
import { roleEnum } from '../constants/enums.js';
import Workers from "../models/Workers"
// import { IUserModel, IUser } from '../models/Users/model';
// import { IAdmin } from '../schemas/admin/model';

// import Device from '../models/Device';


const createJwtValidation = (userTypes) => {

	return async (req, res, next) => {
		try {
			const bearerToken = req.headers.authorization;
			if (!bearerToken) return res.sendStatus(401);
			const token = bearerToken;
			jwt.verify(token, mainConfig.JWT_SECRET, async (error, dtls) => {
				if (error) {
					console.log('a');
					new APIError('UNAUTHORIZED', 401);
					return res.sendStatus(401);
				}
			
				if (!userTypes.includes(dtls.userRole)) {
					

					console.log('b');
					new APIError('UNAUTHORIZED', 401);
					return res.sendStatus(401);
				}

				if (dtls.userRole === roleEnum.user) {

					const worker = await Workers.findOne({ _id: dtls._id });
				
					if(!worker){
						new APIError('UNAUTHORIZED', 401);
						return res.sendStatus(401);
					}
					// if (user.devices[0] == dtls.deviceId) {
						req.user = user;
						return next();
					// } 
					// else {
						// console.log('c');
						// new APIError('UNAUTHORIZED', 401);
						// return res.sendStatus(401);
					// }	
				}
				 else {
					const worker = await Workers.findOne({ _id: dtls._id, role: dtls.userRole });
					if (worker) {
						req.user = worker;
						return next();
					} else {
						new APIError('UNAUTHORIZED', 401);
						return res.sendStatus(401);
					}
				 }
			});
		} catch (err) {
			new APIError(err.message ? err.message : 'INTERNAL SERVER ERROR', 500);
			return res.sendStatus(500);
		}
	};
};

export default {
	validateUser: createJwtValidation([roleEnum.admin, roleEnum.user]),
	validateAdmin: createJwtValidation([roleEnum.admin])

};

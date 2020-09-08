import pkg from 'express';
const { Router, Response } = pkg;
import * as Validations from './validation.js';
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
import APIError from '../../services/APIError.js';
import jwtValidation from '../jwtValidation.js';

class AuthRoutes {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {
    this.router.post('/signin', Validations.signin, this.signin);
    this.router.post('/login', Validations.login, this.login);


  }

   signin = async (req, res) => {
    try {
      const response = await Services.signin(req.body.name, req.body.login, req.body.password, req.body.role);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'signin function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
   login = async (req, res) => {
    try {
      const response = await Services.login(req.body.login, req.body.password)
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'login function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
}

export default new AuthRoutes().router;
import pkg from 'express';
const { Router, Response } = pkg;
import * as Validations from './validation.js';
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
import APIError from '../../services/APIError.js';
import jwtValidation from '../jwtValidation.js';

class WorkersRoutes {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {
    this.router.get('/getWorkers', jwtValidation.validateAdmin, this.getWorkers);
    this.router.post('/updateWorker', jwtValidation.validateAdmin, Validations.updateWorker, this.updateWorker);
    this.router.post('/updatePersonalData', this.updatePersonalData);

  }

  getWorkers = async (req, res) => {
    try {
      const response = await Services.getWorkers();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getWorkers function in getWorkers/service.js');
      res.status(500).send(getErrorResponse());
    }
  }


  updateWorker = async(req,res) =>{
    try {
      const response = await Services.updateWorker(req.body.id, req.body.name, req.body.login, req.body.password, req.body.role);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'changeWorker function in updateWorker/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  updatePersonalData = async(req,res) =>{
    try {
      const response = await Services.updatePersonalData(req.body.id, req.body.login, req.body.password, req.body.repeatPassword);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'updatePersonalData function in updateWorker/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

}

export default new WorkersRoutes().router;
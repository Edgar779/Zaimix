import pkg from 'express';
const { Router, Response } = pkg;
import * as Validations from './validation.js';
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
import APIError from '../../services/APIError.js';
import jwtValidation from '../jwtValidation.js';

class CityRoutes {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {
    this.router.get('/getCities', this.getCities);
    this.router.get('/getFinCities', this.getFinCities);
    this.router.get('/getGuruCities', this.getGuruCities);
    this.router.get('/getUnCities', this.getUnCities);

    this.router.post('/editCities', jwtValidation.validateAdmin, Validations.editCities, this.editCities);

    this.router.post('/addComment', jwtValidation.validateAdmin, Validations.addComment, this.addComment);
    

  }

  getCities = async (req, res) => {
    try {
      const response = await Services.getCities();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getCities function in city/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  getFinCities = async (req, res) => {
    try {
      const response = await Services.getFinCities();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getFinCities function in city/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  
  getGuruCities = async (req, res) => {
    try {
      const response = await Services.getGuruCities();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getGuruCities function in city/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  
  getUnCities = async (req, res) => {
    try {
      const response = await Services.getUnCities();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getUnCities function in city/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  editCities = async (req, res) => {
    try {
      const response = await Services.editCities(req.body.id, req.body.delivery);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'editCities function in city/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  addComment = async (req, res) => {
    try {
      const response = await Services.addComment(req.body.cityId, req.body.comment);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'comment function in city/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

}
export default new CityRoutes().router;
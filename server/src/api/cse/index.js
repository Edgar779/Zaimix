import pkg from 'express';
const { Router, Response } = pkg;
import * as Validations from './validation.js';
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
import APIError from '../../services/APIError.js';
import jwtValidation from '../jwtValidation.js';

class CseRoutes {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {
    this.router.get('/getCse', this.getCse);
    this.router.post('/editCse', Validations.editCse, this.editCse);
    this.router.post('/addCseParameter', this.addCseParameter);


  }

  getCse = async (req, res) => {
    try {
      const response = await Services.getCse();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getCse function in Cse/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  editCse = async (req, res) => {
    try {
      const response = await Services.editCse(req.body.cityId, req.body.day, req.body.address, req.body.shipment, req.body.urgency, req.body.typeDelivery);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'editCse function in Cse/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
  addCseParameter = async (req, res) => {
    try {
      const response = await Services.addCseParameter(req.body.cargoDescription, req.body.cargoType, req.body.typeDelivery, req.body.sender, req.body.senderCountry, req.body.senderCity, req.body.address, req.body.senderPerson, req.body.senderPhone, req.body.receiver, req.body.recipientCountry, req.body.contactPerson, req.body.weight, req.body.amount, req.body.cargoCost);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'addCseParameter function in Cse/service.js');
      res.status(500).send(getErrorResponse());
    }
  }
}
export default new CseRoutes().router;
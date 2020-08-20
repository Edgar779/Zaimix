import pkg from 'express';
const { Router, Response } = pkg;
import * as Validations from './validation.js';
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
import APIError from '../../services/APIError.js';
import jwtValidation from '../jwtValidation.js';

class BankRoutes {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {
    this.router.get('/getBanks', jwtValidation.validateAdmin, this.getBanks);
    this.router.post('/getBankMts', this.getBankMts);

    this.router.post('/createBank', jwtValidation.validateAdmin, Validations.createBank, this.createBank);
    this.router.post('/updateBank', jwtValidation.validateAdmin, Validations.updateBank, this.updateBank);
    this.router.post('/createProduct', jwtValidation.validateAdmin, Validations.createProduct, this.createProduct);
    this.router.get('/getProduct', Validations.getProduct, this.getProduct);
    this.router.post('/updateProduct', jwtValidation.validateAdmin, Validations.updateProduct, this.updateProduct);



  }

  getBanks = async (req, res) => {
    try {
      const response = await Services.getBanks();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getBanks function in bank/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  getBankMts = async (req, res) => {
    try {
      const response = await Services.getBankMts(req.body);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getBankMts function in bank/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  getProduct = async (req,res) =>{
    try {
      const response = await Services.getProduct(req.query.bankId);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getProduct function in bank/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  createBank = async (req, res) => {
    try {
      const response = await Services.createBank(req.body.id, req.body.officialName, req.body.localName, req.body.authToken, req.body.active)
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'createBank function in bank/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  updateBank = async (req,res) =>{
    try {
      const response = await Services.updateBank(req.body._id, req.body.officialName, req.body.localName, req.body.authToken, req.body.active)
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'updateBank function in bank/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  createProduct = async (req,res) =>{
    try {
      const response = await Services.createProduct(req.body.bankId, req.body.productId, req.body.name, req.body.document, req.body.print);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'createProduct function in bank/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

  updateProduct = async (req,res) =>{
    try {
      const response = await Services.updateProduct(req.body.id, req.body.name, req.body.print, req.body.document);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'updateProduct function in bank/service.js');
      res.status(500).send(getErrorResponse());
    }
  }

}

export default new BankRoutes().router;
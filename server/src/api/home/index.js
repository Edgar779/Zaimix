import pkg from 'express';
const { Router, Response } = pkg;
// import * as Validations from './validation';
import Services from './service.js';
import { getErrorResponse } from '../mainModels.js';
// import { IUser } from '../../schemas/user/model';
import APIError from '../../services/APIError.js';

import jwtValidation from '../jwtValidation.js';
// import Category from "../../models/Category.js";
import * as Validations from './validation.js';

import * as multer from 'multer'
// const upload = multer({ dest: 'uploads/' }); // multer configuration

class HomeRoutes {
   router = Router();

  constructor() {
    this.routes();
  }

   routes = () => {
    /** POST api/auth/login - Login functionality for admin with email and password */
    this.router.get('/getcategory', jwtValidation.validateUser, this.getCategory);
    // upload.single('category'),
    this.router.post('/addcategory', jwtValidation.validateAdmin, this.addCategory);
    this.router.get('/sortcategory/:old/:new', jwtValidation.validateAdmin, this.sortCategory);
    this.router.post('/addpromotions', jwtValidation.validateAdmin, this.addPromotion);
    // this.router.post('/addpill', jwtValidation.validateAdmin, this.addPill);
  }
   getCategory = async (req, res) => {
    try {
      const response = await Services.getCategory();
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'getCategory function in home/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  sortCategory = async (req, res) => {
    try {
      
      const response = await Services.sortCategory(req.params.old, req.params.new);
      res.send(response);
    }

    catch (e) {
      new APIError(e, 500, 'addCategory function in home/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  addCategory = async (req, res) => {
    try {
      // console.log(req.file);
      const response = await Services.addCategory(req.file, req.body.name);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'addCategory function in home/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }

  // private addPill = async (req: IRequest<IAdmin>, res: Response) =>{
  //   try {
  //     const response = await Services.addPill(req.file, req.body.name);
  //     res.send(response);
  //   } catch (e) {
  //     new APIError(e, 500, 'addPromotion function in home/service.ts');
  //     res.status(500).send(getErrorResponse());
  //   }
  // }
  addPromotion = async (req, res) => {
    try {
      const response = await Services.addPromotion(req.file, req.body.name);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'addPromotion function in home/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
}
export default new HomeRoutes().router;
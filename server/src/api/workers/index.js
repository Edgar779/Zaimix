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


   login = async (req, res) => {
    try {
      const response = await Services.login(req.body.login, req.body.password)
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'login function in auth/service.js');
      res.status(500).send(getErrorResponse());
    }
  }


   loginAdmin = async (req, res) => {
    try {
      const response = await Services.loginAdmin(req.body.email, req.body.password);
      res.send(response);
    } catch (e) {
      new APIError(e, 500, 'loginAdmin function in auth/service.ts');
      res.status(500).send(getErrorResponse());
    }
  }
  //   private changePassword = async(req: IRequest<IAdmin>, res: Response) => {
  //     try {
  //       const response = await Services.changePassword(req.user, req.body);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'changePassword function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }

  //   private sendSms = async(req: IRequest<IUser>, res: Response) => {
  //     try {
  //       const response = await Services.sendSms(req.body);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'sendSms function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }

  //   private verify = async(req: IRequest<IUser>, res: Response) => {
  //     try {
  //       const response = await Services.verify(req.user, req.body);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'verify function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }

  //   private logout = async(req: IRequest<IUser>, res: Response) => {
  //     try {
  //       const response = await Services.logout(req.user);
  //       res.send(response);
  //     } catch (e) {
  //       new APIError(e, 500, 'logout function in auth/service.ts');
  //       res.status(500).send(getErrorResponse());
  //     }
  //   }

}

export default new WorkersRoutes().router;
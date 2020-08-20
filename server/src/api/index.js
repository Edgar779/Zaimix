import pkg from 'express';
const { Router, Response } = pkg;

import AuthRoutes from './auth/index.js';
import HomeRoutes from './home/index.js';
import WorkersRoutes from './workers';
import BankRoutes from './bank';
import CityRoutes from './city';
import CseRoutes from './cse'
class Routes {

  router = Router();

  constructor() {
    this.routes();
  }

  routes = () => {


    this.router.use('/auth', AuthRoutes);
    this.router.use('/home', HomeRoutes);
    this.router.use('/workers', WorkersRoutes);
    this.router.use('/bank', BankRoutes);
    this.router.use('/city', CityRoutes);
    this.router.use('/cse', CseRoutes);

    
  }
}

export default new Routes().router;
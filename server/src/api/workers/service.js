
import Workers from "../../models/Workers/index";

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";

import { getResponse, getErrorResponse } from '../mainModels.js';

import mainConfig from '../../env';


class WorkersServices {

  getWorkers = async () => {
  
        const getWorkers = await Workers.find({});
        if(!getWorkers){ 
          return getResponse(false, "Workers can not be founded");
         }

        return getResponse(true, "get Worker", getWorkers);

  }

  updateWorker = async (_id, name, login, password, role) =>{

    const updateWorker = {
      login,
      role
    }
    
    if(password.trim() !== null && password.trim() != "" && password != undefined){

      const hashPassword =  await bcrypt.hash(password, 10);
      const updateWorkerPassword = await Workers.findById(_id, {useFindAndModify: false});
      if(!updateWorkerPassword){
        return getResponse(false, "worker was not founded");

      }
      updateWorkerPassword.name = name,
      updateWorkerPassword.login = login;
      updateWorkerPassword.role = role;
      updateWorkerPassword.password = hashPassword;
      updateWorkerPassword.save();

      if(!updateWorkerPassword){
        return getResponse(false, "worker was not founded");
     }

    return getResponse(true, "worker successfuly has been updated", updateWorkerPassword);

    }
    else {
      const updateWorkers = await Workers.findById(_id, {useFindAndModify: false});
    updateWorkers.name = name, 
    updateWorkers.login = login;
    updateWorkers.role = role;
    updateWorkers.save();
    if(!updateWorkers){
      return getResponse(false, "worker was not founded");
    }
    return getResponse(true, "worker successfuly has been updated", updateWorkers);


    }
  }
}


export default new WorkersServices();
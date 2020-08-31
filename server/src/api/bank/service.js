
import Bank from "../../models/Bank/index";
import Product from "../../models/Product/index";

import bcrypt from "bcrypt"

import { getResponse, getErrorResponse } from '../mainModels.js';

import mainConfig from '../../env';
import { async } from "regenerator-runtime";
import { Schema } from "mongoose";

class BankServices {

    getBanks = async () => {

    const getBanks = await Bank.find({});
  
    if(!getBanks){ 
      return getResponse(false, "Banks can not be founded");
     }

    return getResponse(true, "get Bank", getBanks);

  }

  getBankMts = async (body) => {
    if(body.constructor === Object && Object.keys(body).length === 0) {
      return getResponse(false, "body is an empty object.");
    }
    if(!body){ 
      return getResponse(false, "body is an empty object.");
     }

    return getResponse(true, "success", body);

  }

 createBank = async (id, officialName, localName, authToken, active) => {
  

    const bank = new Bank({id, officialName, localName, authToken, active});

    bank.save()

    return getResponse(true, "Bank has been created", bank);

    }
  
    updateBank = async (_id, officialName, localName, authToken, active) =>{
  
    const getBank = await Bank.findById({_id});

    if(!getBank){

          return getResponse(false, "Cannot find the bank");

     }

     getBank.officialName = officialName;
     getBank.localName = localName;
     getBank.authToken = authToken;
     getBank.active = active;
     getBank.save();

     return getResponse(true, "bank successfuly has been updated", getBank);

  }
  getProduct = async (id) =>{

    const findProduct = await Product.find({bank: id})
    if(!findProduct){
      return getResponse(false, "Cannot find the products");
    }
    
    return getResponse(true, "the products of the mentioned bank", findProduct);

  }
  
  createProduct = async (bankId, productId, name, print) =>{

    if (!bankId.match(/^[0-9a-fA-F]{24}$/)) {
      return getResponse(false, `Cannot find the bank with id ${bankId}`);
    }

    const bank = await Bank.findById({_id: bankId});

    const product = new Product({id: productId, name, print});

    if(!product){
      return getResponse(false, "Cannot create a product");
    }

    bank.products.push(product._id);
    bank.save();
    product.bank = bank._id;
    product.save();
    
    return getResponse(true, "Product has been created", product);

  }
  updateProduct = async (id, name, print) =>{

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return getResponse(false, `Cannot find a product with id ${id}`);
    }

    const product = await Product.findById({_id: id});

    // const product = new Product({id: productId, name, document, print});

    if(!product){
      return getResponse(false, `Cannot find a product with id ${id}`);
    }
      product.name = name;
      product.print = print;
      product.save();
    
    return getResponse(true, "Product has been updated", product);

  }
}

export default new BankServices();
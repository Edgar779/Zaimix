
import Bank from "../../models/Bank/index";
import Product from "../../models/Product/index";

import bcrypt from "bcrypt"

import { getResponse, getErrorResponse } from '../mainModels.js';

import mainConfig from '../../env';
import { async } from "regenerator-runtime";
import { Schema, get } from "mongoose";
import axios from "axios";
import { response } from "express";
import Findostavka from "../../models/City";
import Comment from "../../models/Comment"

class CityServices {

 getCities = async () => {

    // const getCities = await axios.get('https://api.boxberry.ru/json.php?token=d6f33e419c16131e5325cbd84d5d6000&method=CourierListCities');

    //     if(!getCities){
    //         return getResponse(false, "can not get cities");
    //     }
    //     const getData = getCities.data;
      
    //     Findostavka.insertMany(getData).then(function(){ 
    //         console.log("Data inserted")  // Success 
    //     }).catch(function(error){ 
    //         console.log(error)      // Failure 
    //     }); 


    const getCities = await Findostavka.find({});

        if(!getCities){
            return getResponse(false, "Can not get cities")
        }
              return getResponse(true, "successfully get the cities", getCities)

    }

    getFinCities = async () => {

        const findCity = await Findostavka.find({delivery: '1'});
    
        if(!findCity){
            return getResponse(false, 'Can not find the city');    
        }
    
    
        return getResponse(true, 'FinCity', findCity);    
        
        }
    
    getGuruCities = async () => {

       const findCity = await Findostavka.find({delivery: '2'});
        
            if(!findCity){
                return getResponse(false, 'Can not find the city');    
            }
        
        
            return getResponse(true, 'FinCity', findCity);    
            
      }

     getUnCities = async () => {

                const findCity = await Findostavka.find({delivery: '0'});
            
                if(!findCity){
                    return getResponse(false, 'Can not find the city');    
                }
            
            
                return getResponse(true, 'FinCity', findCity);    
                
        }
                
    editCities = async (id, delivery) => {

    const findCity = await Findostavka.findById({_id: id});

    if(!findCity){
        return getResponse(false, 'Can not find the city');    
    }

    findCity.delivery = delivery;
    findCity.save()

    return getResponse(true, 'Updated');    
    
    }

    addComment = async (cityId, comment) =>{

        const findCity = await Findostavka.findById({_id: cityId});

        if(!findCity){
            return getResponse(false, 'Can not find the city');    
        }

        findCity.comment = comment;
        findCity.save();

        return getResponse(false, 'has been added');    


    }
}


export default new CityServices();
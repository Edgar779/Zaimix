
import { getResponse, getErrorResponse } from '../mainModels.js';

import Findostavka from "../../models/City";
import Cse from '../../models/Cse/index.js';
import Parameter from '../../models/ParameterCse'

class CseServices {

    getCse = async () => {

        const findCity = await Findostavka.find({}).populate('cse');
    
        if(!findCity){
            return getResponse(false, 'Can not find the city');    
        }
    
    
        return getResponse(true, 'FinCity', findCity);    
        
        }

    editCse = async (_id, day, address, shipment, urgency, typeDelivery) => {

        const findCity = await Findostavka.findById({_id});

        const cse = new Cse({
            day,
            address,
            shipment,
            urgency
        })
        const findDeleteCse = await Cse.findOneAndDelete({city: _id});
         
        findCity.cse = cse._id;

        findCity.save();

        cse.city = findCity._id;

        cse.save();

        return getResponse(true, "has been added Cse", cse)
        
        }
      editCse = async (_id, day, address, shipment, urgency, typeDelivery) => {

        const findCity = await Findostavka.findById({_id});

        const cse = new Cse({
            day,
            address,
            shipment,
            urgency
        })
        const findDeleteCse = await Cse.findOneAndDelete({city: _id});
         
        findCity.cse = cse._id;

        findCity.save();

        cse.city = findCity._id;

        cse.save();

        return getResponse(true, "has been added Cse", cse)
        
        }  

        addCseParameter = async (cargoDescription, cargoType, typeDelivery, sender, senderCountry, senderCity, address, senderPerson, senderPhone, receiver, recipientCountry, contactPerson, weight, amount, cargoCost) => {

            const addParameter = new Parameter({cargoDescription, cargoType, typeDelivery, sender, senderCountry, senderCity, address, senderPerson, senderPhone, receiver, recipientCountry, contactPerson, weight, amount, cargoCost})
    
            addParameter.save();

            return getResponse(true, "has been added new Parameter", addParameter)
            
            }
}


export default new CseServices();
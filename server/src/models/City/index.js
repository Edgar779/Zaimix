import * as mongoose from 'mongoose';
import { any } from 'joi';


const Schema = mongoose.Schema;

const schema = new Schema({

    City: {
        type: String
    },
    Area: {
        type: String
    },
    DeliveryPeriod:{
        type: String
    },
    Region: {
        type: String
    },
    delivery: {
        type: String,
        default: 1
    },
    comment: {
        type: String,
        default: null
    },
    cse: {
        type: Schema.Types.ObjectId,
        ref: "Cse"
    },  

});

export const Findostavka = mongoose.model('Findostavka', schema);
export default Findostavka;
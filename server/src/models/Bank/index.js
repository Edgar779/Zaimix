import * as mongoose from 'mongoose';
import { any } from 'joi';


const Schema = mongoose.Schema;

const schema = new Schema({
    id: {
        type: String
    },

    officialName: {
        type: String
    },
    localName: {
        type: String
    },
    authToken: {
        type: String
    },
    active: {
        type: Boolean,
    },
    products: [{
        type: Schema.Types.ObjectId,
        ref: "Product"
    }], 
    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});

export const Bank = mongoose.model('Bank', schema);
export default Bank;
import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    // bank: {
    //     type: Schema.Types.ObjectId,
    //     ref: "Bank"
    // },
    cargoDescription: {
        type: String
    },
    cargoType: {
        type: String
    },
    typeDelivery: {
        type: String
    },
    sender: {
        type: String,
    },
    senderCountry: {
        type: String,
    },
    senderCity: {
        type: String,
    },
    address: {
        type: String
    },
    senderPerson: {
        type: String,
    },
    senderPhone: {
        type: String,
    },
    receiver: {
        type: String
    },
    recipientCountry: {
        type: String
    },
    contactPerson: {
        type: String
    },
    weight: {
        type: String
    },
    amount: {
        type: String
    },
    cargoCost:{
        type: String
    },

    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Parameter = mongoose.model('Parameter', schema);
export default Parameter;
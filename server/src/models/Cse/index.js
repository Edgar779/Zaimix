import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({

    day: {
        type: String
    },
    address: {
        type: String
    },
    shipment: {
        type: String
    },
    urgency: {
        type: String,
    },
    city: {
        type: Schema.Types.ObjectId,
        ref: "City"
    },
    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Cse = mongoose.model('Cse', schema);
export default Cse;
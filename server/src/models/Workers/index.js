import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    // devices: [{
    //     type: Schema.Types.ObjectId,
    //     ref: "Device"
    // }],
    name: {
        type: String
    },
    login: {
        type: String
    },
    password: {
        type: String
    },
    role: {
        type: Number,
        default: 1
    },
    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Worker = mongoose.model('Worker', schema);
export default Worker;
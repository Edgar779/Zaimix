import * as mongoose from 'mongoose';

const Schema = mongoose.Schema;

const schema = new Schema({
    bank: {
        type: Schema.Types.ObjectId,
        ref: "Bank"
    },
    id: {
        type: String
    },
    name: {
        type: String
    },

    print: {
        type: Number,
        default: 0
    },
    createdDt: { type: Date, default: Date.now },

    updatedDt: { type: Date, default: Date.now },

});


export const Product = mongoose.model('Product', schema);
export default Product;
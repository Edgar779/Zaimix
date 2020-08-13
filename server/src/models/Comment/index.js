import * as mongoose from 'mongoose';
import { any } from 'joi';


const Schema = mongoose.Schema;

const schema = new Schema({
    
    comment: {
        type: String
    }

});

export const Comment = mongoose.model('Comment', schema);
export default Comment;
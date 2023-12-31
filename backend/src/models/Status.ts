import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Status = new Schema({
    username: {
        type: String
    },
    text: {
        type: String
    },
    likedBy: {
        type: Array<String>
    },
    comments: {
        type: Array
    }

}, {timestamps: true});

export default mongoose.model('Status', Status);
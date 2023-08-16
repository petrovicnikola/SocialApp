import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema({
    name: {
        type: String
    },
    surname: {
        type: String
    },
    username: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String
    },
    bio: {
        type: String
    },
    photo: {
        type: String
    }
}, {timestamps: true});

export default mongoose.model('User', User);
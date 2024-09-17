import mongoose from "mongoose";
import { Schema } from "mongoose";


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
}) 

const UserModel = mongoose.model("User", UserSchema)

export default UserModel;
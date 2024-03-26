import mongoose from "mongoose";
import {mongodb} from "./config.js";
import  { styleText } from 'node:util'


export const connectDb = async () => {
    try {
        await mongoose.connect(mongodb);
        console.log(styleText('italic',styleText('green','Mongo Database connected')));
    } catch (error) {
        // Log the error if there is any while connecting to the database
        console.log(error);
    }
}

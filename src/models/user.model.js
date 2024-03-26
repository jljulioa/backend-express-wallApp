import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
            url100: {
                type: String,
                required: false
            },
            url300: {
                type:String,
                required: false
            }
    }
},
 {timestamps: true}
);

export default mongoose.model('users', userSchema);
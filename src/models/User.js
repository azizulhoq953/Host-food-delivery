import { model, models, Schema } from "mongoose";
import bcrypt from 'bcrypt';
import { type } from "os";
 
const UserSchema = new Schema({
    name: {type: String},
    email: {type: String, required: true, unique: true},
    password: {
        type: String,
        // required: true,
        // validate: pass => {
        //     if (!pass?.length || pass.length < 5){
        //         new Error('password Must be at least 5 charecter');
        //         return false;
            // }
        // },
    },
},{timestamps: true});

export const User = models?.User || model('User', UserSchema);

//  export default User;
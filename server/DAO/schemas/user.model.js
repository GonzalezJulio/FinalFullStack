import mongoose from "mongoose";

const collectionName = 'users'
const userSchema = new mongoose.Schema({
    name: String,
    lastname: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    
    password: {
        type: String
        
    },
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts",
        
    },
    role: {
        type: String,
        enum: ["admin", "user", "premium"],
        default: 'user'
    }, 
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
       }
})

const userModel = mongoose.model(collectionName, userSchema)
export default userModel




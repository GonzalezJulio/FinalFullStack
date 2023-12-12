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
        default: "https://i.pinimg.com/originals/a1/b8/7b/a1b87bc0de86d2735e28bf5ba81dd69a.png",
       },
},
{ timestamps: true }
)

const userModel = mongoose.model(collectionName, userSchema)
export default userModel




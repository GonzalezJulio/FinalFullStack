import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"
import 'dotenv/config'

const collectionName = 'products'
// (title, description, price, thumbnail, code, stock, category)
const productsSchema = new mongoose.Schema({
   
    title:{
        type: String,
        required: true,
        
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    images: {
        type: String,  
        required: true,   
    },
    code:{
        type: String,
        
    },
    stock:{
        type: Number,
        required: true,
    },
    category: {
        type: String,
        requierd: true,
    },
    owner: {
        type: String,
        
        default: 'admin',
    }
    
});



productsSchema.plugin(paginate)
const productModel = mongoose.model(collectionName, productsSchema)

export default productModel 
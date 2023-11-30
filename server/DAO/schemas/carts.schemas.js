import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2"

const collectionName = 'carts'

const cartSchema =  new mongoose.Schema({
    products: [
        {
            product: {type: mongoose.Schema.Types.ObjectId, ref: "products", required: true },
            quantity: {type: Number, required: true},
        }
    ]
});
cartSchema.pre('find', function () {this.populate('products.product')})
cartSchema.pre('findOne', function () { this.populate('products.product')})

cartSchema.plugin(paginate) 

const cartsModel = mongoose.model(collectionName, cartSchema)

export default cartsModel 
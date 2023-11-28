import productModel from "../models/schemas/product.model.js"

export default class ProductsService {
    contructor() {}
    create = async (data) => {
        try{
            let one =  await productModel.create(data)
            return {
                message: "product created",
                response: one._id
            }
        }catch(error) {
            return {
                message: error.message,
                response: error.fileName+": " + error.lineNumber
            }
        } 
    }    
    read = async () => {
        try{
            let all = await productModel.find()
            return {
                message: "product read",
                response: all
            }
        } catch(error){
            return {
                message: error.message,
                response: error.fileName+": " + error.lineNumber
            }
        }
    }
    update = async () => {
        try{
            let one = await productModel.findByIdAndUpdate(req.params.id, req.body, {new: true})
            return {
                message: "product updated",
                response: one._id
            }
        } catch(error){
            return {
                message: error.message,
                response: error.fileName+": " + error.lineNumber
            }
        }
    }
    destroy = async () => {
        try{
            let one =  await productModel.findByIdAndDelete(req.params.id)
            return {
                message: "product deleted",
                response: one._id
            }
        }catch(error){
            return {
                message: error.message,
                response: error.fileName+": " + error.lineNumber
            }
        }
    }
} 
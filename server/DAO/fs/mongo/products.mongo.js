import productModel from "../../schemas/product.model.js";

export default class ProductsMongo {
    constructor() {}
    
    create = async (data) => {
        try {
        let one = await productModel.create(data);
        return {
            message: "product created",
            response: one._id,
        };
        } catch (error) {
        return {
            message: error.message,
            response: error.fileName + ": " + error.lineNumber
        };
        }
    };
    
    read = async () => {
        try {
        let all = await productModel.find();
        if(all.length > 0){
            return {
                message: "product read",
                response: all
            };
        }else{
            return {
                message: "product not found",
                response: all
            };
        }
        
        } catch (error) {
        return {
            message: error.message,
            response: error.fileName + ": " + error.lineNumber
        };
        }
    };
    read = async (id) => {
        try {
        let one = await productModel.findById(id);
        if(one) {
            return {
                message: "product read",
                response: one
            };
        } else {
            return {
                message: "product not found",
                response: one
            };
        }
        
        } catch (error) {
        return {
            message: error.message,
            response: error.fileName + ": " + error.lineNumber
        };
        }
    };
    
    update = async (id, data) => {
        try {
        let one = await productModel.findByIdAndUpdate(id, data, {new: true});
        if(one) {
            return {
                message: "product updated",
                response: one._id
            };
        } else {
            return {
                message: "product not found",
                response: one._id
            };
        }
        
        } catch (error) {
        return {
            message: error.message,
            response: error.fileName + ": " + error.lineNumber
        };
        }
    };
    
    destroy = async (id) => {
        try {
        let one = await productModel.findByIdAndDelete(id);
        if(one) {
            return {
                message: "product deleted",
                response: one._id
            };
        } else {
            return {
                message: "product not found",
                response: one._id
            };
        }
        
        } catch (error) {
        return {
            message: error.message,
            response: error.fileName + ": " + error.lineNumber
        };
        }
    };
}
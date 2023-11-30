import cartsModel from '../../schemas/carts.schemas.js';

export default class CartsMongo {
    constructor() {}

    create = async (data) => {
        try {
            let one = await cartsModel.create(data);
            return {
                message: "cart created",
                response: one._id,
            };
        } catch (error) {
            console.log(error)
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        }
    };

    read = async () => {
        try {
            let all = await cartsModel.find();
            return {
                    message: "cart read",
                    response: all
                };
            

        } catch (error) {
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        }
    };
    readOne = async (id) => {
        try {
            let one = await cartsModel.findById(id);
            
                return {
                    message: "cart read",
                    response: one
                };
            

        } catch (error) {
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        }
    };
    update = async (id, data) => {
        try {
            let one = await cartsModel.findByIdAndUpdate(id, data);
            if (one) {
                return {
                    message: "cart updated",
                    response: one._id
                };
            } else {
                return {
                    message: "cart not found",
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
    delete = async (id) => {
        try {
            let one = await cartsModel.findByIdAndDelete(id);
            if (one) {
                return {
                    message: "cart deleted",
                    response: one._id
                };
            } else {
                return {
                    message: "cart not found",
                    response: one
                };
            }

        } catch (error) {
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            }
        }
    }

}
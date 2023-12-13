import cartsModel from '../../schemas/carts.schemas.js';
import productModel from '../../schemas/product.model.js'


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

    createAddProduct = async (cid, pid) => {
        try {
            const thisCart = await cartsModel.findOne(cid)
            if (!thisCart) { return { status: 500, message: 'Cart doesnt exist, check id.' } }
            if (user.cartId !== thisCart._id.toString()) return { status: 401, message: 'This cart doesnt belong to you scroundel!' }
            let thisProduct = await productModel.findOne(pid)
            if (!thisProduct) return { status: 500, message: 'Product doesnt exist in db, check id.' }
            if (user.email || user.role === thisProduct.owner) return { status: 401, message: 'This product owner is you! You cant buy it! sod off!' }
            const productIndex = await thisCart.products.findIndex((p) => p.product._id.toString() === pid);
            if (productIndex !== -1) {
                thisCart.products[productIndex].quantity = parseInt(thisCart.products[productIndex].quantity) + 1
            } else {
                thisCart.products.push({ product: pid, quantity: 1 })
            }

            const updateResult = await cartsModel.updateOne({ _id: cid }, thisCart, { new: true });

            if (updateResult.modifiedCount === 1) {
                return { status: 200, message: `Product added to cart`, payload: thisCart };
            } else {
                return { status: 500, message: 'Cart not found or no changes were made.' };
            }
        } catch (error) { throw error }
        
        /* try {
            let cart = await cartsModel.findOne(cid);
            console.log(cart)
            let product = await productModel.findOne(pid);
            console.log(product)
            cart.products.push(product);
            let savedCart = await cart.save();
            console.log(savedCart)
            return {
                message: "product added to cart",
                response: savedCart
            }
        } catch (error) {
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        } */
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
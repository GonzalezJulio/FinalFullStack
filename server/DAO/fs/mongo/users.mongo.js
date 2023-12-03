import cartsModel from '../../schemas/carts.schemas.js';
import usersModel from '../../schemas/user.model.js'
import crypto from "crypto"
import UsersDTO from '../../dto/users.dto.js';
import userModel from '../../schemas/user.model.js';
import CartsMongo from './carts.mongo.js';


export default class UsersMongo {
    constructor() {
        this.carts = new CartsMongo()
    }
    async create(users) {
        try {
            users.salt = crypto.randomBytes(128).toString("base64");
            users.password = crypto
                .createHmac("sha256", users.salt)
                .update(users.password)
                .digest("hex");
            users.cartId = this.carts.create();
            let response = await usersModel.create(users);

            return {
                message: "user created",
                response: response._id
            };
        } catch (error) {
            console.log(error);
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        }
    }
    async read() {
        try {
            let all = await usersModel.find();
            if (all.length > 0) {
                return {
                    message: "user read",
                    response: all
                };
            } else {
                return {
                    message: "user not found",
                    response: all
                };
            }
        } catch (error) {
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        }
    }
    async readOne(email) {
        try {
            let one = await usersModel.findOne({
                email: email
            });
            if (one) {
                return {
                    message: "user read",
                    response: one
                };
            } else {
                return {
                    message: "user not found",
                    response: one
                };
            }
        } catch (error) {
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        }
    }
    async update(email) {
        try {
            let one = await usersModel.updateOne({
                email: email
            }, data);
            if (one) {
                return {
                    message: "user updated",
                    response: one
                };
            } else {
                return {
                    message: "user not found",
                    response: one
                };
            }
        } catch (error) {
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        }
    }

    async destroy(id) {
        try {
            
            if (one) {
                return {
                    message: "user deleted",
                    response: one
                };
            } else {
                return {
                    message: "user not found",
                    response: one
                };
            }
        } catch (error) {
            return {
                message: error.message,
                response: error.fileName + ": " + error.lineNumber
            };
        }
    }


}

import usersModel from '../../schemas/user.model.js'

export default class UsersMongo {
    constructor() {}
    async create(data) {
        try {
            let one = await usersModel.create(data);
            return {
                message: "user created",
                response: one._id,
            };
        } catch (error) {
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
    async update() {
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

    async delete(email) {
        try {
            let one = await usersModel.deleteOne({
                email: email
            });
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

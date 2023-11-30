import CartsRepository from "../repositories/carts.repository.js";

export default class CartsService {
    constructor() {
        this.repository = new CartsRepository();
    }

    create = async (data) => {
        try {
            let response = await this.repository.create(data);
            return response;
        } catch (error) {
            console.log(error);
            return {
                message: error.message,
                reponse: error.name,
            };
        }
    }
    read = async () => {
        try {
            let response = await this.repository.read();
            return response;
        } catch (error) {
            console.log(error);
            return {
                message: error.message,
                reponse: error.name,
            };
        }
    }
    readOne = async (id) => {
        try {
            let response = await this.repository.readOne(id);
            return response;
        } catch (error) {
            console.log(error);
            return {
                message: error.message,
                reponse: error.name,
            };
        }
    }
    update = async (id, data) => {
        try {
            let response = await this.repository.update(id, data);
            return response;
        } catch (error) {
            console.log(error);
            return {
                message: error.message,
                reponse: error.name,
            };
        }
    }
    destroy = async (id) => {
        try {
            let response = await this.repository.destroy(id);
            return response;
        } catch (error) {
            console.log(error);
            return {
                message: error.message,
                reponse: error.name,
            };
        }
    }
}
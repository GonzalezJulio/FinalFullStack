/* import CartsDTO from "../DAO/dto/carts.dto.js"; */
import dao from "../DAO/Factory.js";
const { Cart } = dao;

export default class CartsRepository {
    constructor() {
        this.model = new Cart();
    }

    create = async (data) => {
        try{
            let response = await this.model.create(new Cart(data));
            return response;
        }catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    read = async () => {
        try{
            let response = await this.model.read();
            return response;
        }catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    readOne = async (id) => {
        try{
            let response = await this.model.readOne(id);
            return response;
        }catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    update = async (id, data) => {
        try{
            let response = await this.model.update(id, data);
            return response;
        }catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    destroy = async (id) => {
        try{
            let response = await this.model.destroy(id);
            return response;
        }catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
}
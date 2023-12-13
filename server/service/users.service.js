import UsersRepository from "../repositories/users.repository.js";

export default class UsersService {
    constructor(){
        this.repository = new UsersRepository();
    }

    create = async (users) => {
        try{
            let response = await this.repository.create(users);
            return response;
        } catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    read = async (id) => {
        try{
            let response = await this.repository.read(id);
            return response;
        } catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    readOne = async (email) => {
        try{
            let response = await this.repository.readOne(email);
            return response;
        } catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    readCart = async (user) => {
        try{
            let response = await this.repository.readCart(user.cartId);
            return response;
        } catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }

    update = async (email, data) => {
        try{
            let response = await this.repository.update(email, data);
            return response;
        } catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    destroy = async (id) => {
        try{
            let response = await this.repository.destroy(id);
            return response;
        } catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
}
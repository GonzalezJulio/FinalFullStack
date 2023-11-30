import UsersRepository from "../repositories/users.repository.js";

export default class UsersService {
    constructor(){
        this.repository = new UsersRepository();
    }

    create = async (data) => {
        try{
            let response = await this.repository.create(data);
            return response;
        } catch(error){
            console.log(error);
            return {
                message: error.message,
                response: error.name,
            };
        }
    }
    read = async () => {
        try{
            let response = await this.repository.read();
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
    destroy = async (email) => {
        try{
            let response = await this.repository.destroy(email);
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
import UsersDTO from "../DAO/dto/users.dto.js";
import dao from "../DAO/Factory.js";
import CartsDTO from "../DAO/dto/carts.dto.js";
import cartsModel from "../DAO/schemas/carts.schemas.js";
import args from ".././config/args.js"
import CartsMongo from "../DAO/fs/mongo/carts.mongo.js";

const { User } = dao;

export default class UsersRepository {
  constructor() {
   
    this.model = new User();
  }

  create = async (users) => {
    try {
      let cart = new CartsMongo();
      let cartId = await cart.create();
      users.cartId = cartId;
      let response = await this.model.create(users);
      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.name,
      };
    }
  };

  read = async () => {
    try {
      let response = await this.model.read();
      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.name,
      };
    }
  };

  readOne = async (email) => {
    try {
      let response = await this.model.readOne(email);
      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.name,
      };
    }
  };

  update = async (email, data) => {
    try {
      let response = await this.model.update(email, data);
      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
  destroy = async (id) => {
    try {
      let response = await this.model.destroy(id);
      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.name,
      };
    }
  };
}

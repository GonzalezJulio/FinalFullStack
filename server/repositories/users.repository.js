import UsersDTO from "../DAO/dto/users.dto.js";
import dao from "../DAO/Factory.js";
import CartsDTO from "../DAO/dto/carts.dto.js";

const { User } = dao;

export default class UsersRepository {
  constructor() {
    this.cart = new CartsDTO
    this.model = new User();
  }

  create = async (data) => {
    try {
      let cartId = await this.model.create(this.cart)
      let response = await this.model.create(data, cartId);
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

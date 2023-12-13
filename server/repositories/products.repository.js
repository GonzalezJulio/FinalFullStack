import ProductsDTO from "../DAO/dto/products.dto.js";
import dao from "../DAO/Factory.js";
const { Product } = dao;

export default class ProductsRepository {
  constructor() {
    this.model = new Product();
  }

  create = async (data) => {
    try {
      let response = await this.model.create(new ProductsDTO(data));
      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        reponse: error.name,
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
        reponse: error.name,
      };
    }
  };
  readOne = async (id)=> {
    try {
      let response = await this.model.read(id);
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
      let response = await this.model.update(id, data);
      return response;
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        reponse: error.name,
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
        reponse: error.name,
      };
    }
  };
}

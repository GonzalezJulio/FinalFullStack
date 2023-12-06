import usersModel from "../../schemas/user.model.js";
import crypto from "crypto";
import cartsModel from "../../schemas/carts.schemas.js";
import bcryptjs from 'bcryptjs'
import CartsDTO from "../../dto/carts.dto.js";
import UsersDTO from "../../dto/users.dto.js";


export default class UsersMongo {
  constructor() {
    this.model = new UsersDTO();
    
  }

  async create(users) {
    try {
      const newUser = users;
      const validUser = await this.readOne(newUser.email);
      if(validUser.response.email) return { message: "User already exists" };

      // Hash password
      newUser.password = await bcryptjs.hash(newUser.password, 10);
      newUser.cartId = new cartsModel();
      const user = new usersModel(newUser);
      const response = await user.save();

      
      return {
        message: "user created",
        response: response,
      };
      

    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  async read() {
    try {
      let all = await usersModel.find();
      return {
        message: "users read",
        response: all,
      };
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  async readOne(email) {
    try {
      let one = await usersModel.find({ email });
      return {
        message: "user read",
        response: one,
      };
      } catch (error) {
        return {
          message: error.message,
          response: error.fileName + ": " + error.lineNumber,
        };
      }
  }
  async update(email) {
    try {
      let one = await usersModel.updateOne(
        {
          email: email,
        },
        data
      );
      if (one) {
        return {
          message: "user updated",
          response: one,
        };
      } else {
        return {
          message: "user not found",
          response: one,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }

  async destroy(id) {
    try {
      if (one) {
        return {
          message: "user deleted",
          response: one,
        };
      } else {
        return {
          message: "user not found",
          response: one,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
}

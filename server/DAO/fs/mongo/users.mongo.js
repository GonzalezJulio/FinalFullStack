import usersModel from "../../schemas/user.model.js";
import crypto from "crypto";
import UsersDTO from "../../dto/users.dto.js";
import cartsModel from "../../schemas/carts.schemas.js";
import CartsDTO from "../../dto/carts.dto.js";
import CartsMongo from "../mongo/carts.mongo.js";

export default class UsersMongo {
  constructor() {
    this.model = new UsersDTO();
    
  }

  async create(users) {
    try { 
      
      let user = await this.model.createUser(users);

      await usersModel.create(user);
      return {
        message: "user created",
        response: user,
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
      if (all.length > 0) {
        return {
          message: "user read",
          response: all,
        };
      } else {
        return {
          message: "user not found",
          response: all,
        };
      }
    } catch (error) {
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  async readOne(email) {
    try {
      let one = await usersModel.findOne({
        email: email,
      });
      if (one) {
        return {
          message: "user read",
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

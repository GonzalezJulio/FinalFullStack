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
  
      // Verificar si el usuario ya existe
      if (validUser && validUser.response && validUser.response.email) {
        return { message: "User already exists" };
      }
  
      // Obtener el carrito compartido o crear uno nuevo si no existe
      let sharedCart = await cartsModel.findOne({ isShared: true });
  
      if (!sharedCart) {
        // Si no existe, crea un nuevo carrito compartido
        sharedCart = new cartsModel({ isShared: true });
        await sharedCart.save();
      }
  
      // Asignar el carrito compartido al nuevo usuario
      newUser.cartId = sharedCart;
  
      // Hash de la contraseña
      newUser.password = await bcryptjs.hash(newUser.password, 10);
  
      // Crear y guardar el nuevo usuario
      const user = new usersModel(newUser);
      const response = await user.save();
  
      return {
        message: "User created",
        response: response,
      };
    } catch (error) {
      return {
        message: error.message,
        response: error.stack, // Devolver la pila de llamadas para facilitar la depuración
      };
    }
  }
  async read() {
    try {
      let one = await usersModel.find()
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
 /*  async readCart (user) {
    try {
      let one = await usersModel.findById(user).populate("cartId");
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
  } */

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

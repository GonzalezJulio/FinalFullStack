import fs from "fs";
import bcryptjs from 'bcryptjs'
import CartsDTO from "../dto/carts.dto.js";

export default class UsersFS {
  constructor() {
    this.users = [];
    this.path = "./server/DAO/fs/files/users.fs.json";
    this.init();
  }
  init() {
    let file = fs.existsSync(this.path);
    if (!file) {
      fs.writeFileSync(this.path, "[]");
    } else {
      this.users = JSON.parse(fs.readFileSync(this.path, "UTF-8"));
    }
    return true;
  }
  async create(users) {
    try { 
      const newUser = users;
      const validUser = await this.readOne(newUser.email);
      if(validUser.response.email) return { message: "User already exists" };
      // Hash password
      newUser.password = await bcryptjs.hash(newUser.password, 10);
      newUser.cartId = new CartsDTO();
      this.users.push(newUser);
      let data_json = JSON.stringify(this.users, null, 2);
      fs.writeFileSync("./server/DAO/fs/files/users.fs.json", data_json);
      return {
        message: "user created",
        response: newUser,
      };
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  read() {
    try {
      let all = this.users;
      return all;
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  readOne(email) {
    try {
      let one = this.users.find((each) => each.email == email);
      if (one) {
        return {
          message: "user read",
          response: one,
        };
      } else {
        return {
          message: "user not found",
          response: {},
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  update(email) {
    try {
      let index = this.users.findIndex((each) => each.email == user.email);
      if (index != -1) {
        this.users[index] = user;
        let data_json = JSON.stringify(this.users, null, 2);
        fs.writeFileSync(this.path, data_json);
        return {
          message: "user update",
          response: user,
        };
      } else {
        return {
          message: "user not found",
          response: {},
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
  destroy(id) {
    try {
      let one = this.users.find((each) => each._id == id);
      if (one) {
        this.users = this.users.filter((each) => each._id != id);
        let data_json = JSON.stringify(this.users, null, 2);
        fs.writeFileSync(this.path, data_json);
        return {
          message: "user deleted",
          response: one,
        };
      } else {
        return {
          message: "user not found",
          response: {},
        };
      }
    } catch (error) {
      console.log(error);
      return {
        message: error.message,
        response: error.fileName + ": " + error.lineNumber,
      };
    }
  }
}

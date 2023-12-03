import fs from "fs";
import crypto from "crypto";
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
      users.salt = crypto.randomBytes(128).toString("base64");
      users.password = crypto
        .createHmac("sha256", users.salt)
        .update(users.password)
        .digest("hex");
      users.cartId = new CartsDTO();
      this.users.push(users);
      let data_json = JSON.stringify(this.users, null, 2);
      fs.writeFileSync(this.path, data_json);
      return {
        message: "user created",
        response: users,
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

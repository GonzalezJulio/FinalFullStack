import crypto from "crypto";
import args from "../../config/args.js";
import CartsDTO from "../dto/carts.dto.js"



export default class UsersDTO {
  constructor(obj) {
    this.name = null;
    this.lastname = null;
    this.email = null;
    this.age = null;
    this.cartId = null;
    this.role = null;
    if (args.mode === "dev") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
  }

  async createUSer (userRegisterData) {
    const user = new UsersDTO();
    user.name = userRegisterData.name;
    user.lastname = userRegisterData.lastname;
    user.email = userRegisterData.email;
    user.age = userRegisterData.age;
    user.password = await this.createHash(userRegisterData.password);
    user.cartId = await this.createCartForUser();
    user.role = userRegisterData.role;
    return user;
  }

  async createHash(password) {
    const salt = crypto.randomBytes(16).toString("hex");
    const hash = crypto
      .pbkdf2Sync(password, salt, 1000, 64, "sha512")
      .toString("hex");
    return { salt, hash };
  }
  async verifyPassword(userLoginData) {
    const hash = crypto
      .pbkdf2Sync(
        userLoginData.password,
        userLoginData.salt,
        1000,
        64,
        "sha512"
      )
      .toString("hex");
    return hash === userLoginData.hash;
  }
  async createCartForUser() {
    const cart = new CartsDTO();
    return cart;
  }
}

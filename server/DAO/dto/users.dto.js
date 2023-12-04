import bcryptjs from 'bcryptjs'
import args from "../../config/args.js";

import CartsMongo from "../fs/mongo/carts.mongo.js";



class UsersDTO{
  constructor() {}

  async createUser(userRegisterData) {
    const user = new UsersDTO();
    user.name = userRegisterData.name;
    user.lastname = userRegisterData.lastname;
    user.age = userRegisterData.age;
    user.email = userRegisterData.email;
    user.password = await this.createHash(userRegisterData.password);
    user.cartId = await this.createCartForUser();
    user.role = userRegisterData.role
    return user;
  }

  async createHash(password) {
    const salt = await bcryptjs.genSalt(args.saltRounds);
    const hash = await bcryptjs.hash(password, salt);
    return hash;
  }

  async createCartForUser() {
    const cart = new CartsMongo();
    const cartId = await cart.create();
    return cartId;
  }

}


export default UsersDTO;









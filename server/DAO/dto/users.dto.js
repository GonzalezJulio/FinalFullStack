import crypto from "crypto";
import args from "../../config/args.js";
import CartsFS from "../fs/carts.fs.js";



class UsersDTO{
  constructor(obj) {
    this.name = obj.name;
    this.lastname = obj.lastname;
    this.email = obj.email;
    this.age = obj.age;
    this.password = obj.password;
    this.cartId = obj.cartId;
    this.role = obj.role;
    if (args.mode === "dev") {
      this._id = crypto.randomBytes(12).toString("hex");
    }
  }

  async createUser(userRegisterData) {
    const user = new UserDTO();
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
    return crypto.hashSync(password, bcrypt.genSaltSync(10));
  }

  async createCartForUser() {
    try {
      const cartCreationResult = await CartsFS.createCart();
      if (cartCreationResult.status === 200) {
        return cartCreationResult.payload._id
      } else {
        throw new Error('Failed to create a cart for the user.');
      }
    } catch (error) {
      throw error;
    }
  }

}


export default UsersDTO;









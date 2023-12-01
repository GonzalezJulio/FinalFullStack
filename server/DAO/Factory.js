import args from "../config/args.js";
import "dotenv/config";
import { connect } from "mongoose";

let dao = {};

switch (args.mode) {
  case "dev":
    console.log("connected to fs");
    const { default: ProductsFS } = await import("./fs/products.fs.js");
    const { default: CartsFS } = await import("./fs/carts.fs.js");
    const { default: UsersFS } = await import("./fs/users.fs.js");
    dao = {
      Product: ProductsFS,
      Cart: CartsFS,
      User: UsersFS,
    };
    break;
  default:
    connect(process.env.MONGO_DB).then(() => console.log("Connect to db"));
    const { default: ProductsMongo } = await import("./fs/mongo/products.mongo.js");
    const { default: CartsMongo } = await import("./fs/mongo/carts.mongo.js");
    const { default: UsersMongo } = await import("./fs/mongo/users.mongo.js");

    dao = {
      Product: ProductsMongo,
      Cart: CartsMongo,
      User: UsersMongo,
    };
    break;
}

export default dao;

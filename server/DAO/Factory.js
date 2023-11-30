import args from "../config/args.js";
import "dotenv/config";
import { connect } from "mongoose";

let dao = {};

switch (args.mode) {
  case "dev":
    console.log("connected to fs");
    const { default: ProductsFS } = await import("./fs/files/products.fs.js");
    // import todas la rutas de fs del proyecto,
    dao = {
      Product: ProductsFS,
    };
    break;
  default:
    connect(process.env.MONGO_DB).then(() => console.log("Connect to db"));
    const { default: ProductsMongo } = await import(
      "./fs/mongo/products.mongo.js"
    );
    dao = {
      Product: ProductsMongo,
    };
    break;
}

export default dao;

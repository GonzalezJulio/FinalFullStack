import args from "../config/args.js"
import { config } from "dotenv"
import { connect } from "mongoose"

let dao = {}

switch (args.mode) {
    case "dev":
        connect(process.env.MONGO_DB).then(() => "Connect to db")
        const { default: ProductsMongo } = await import("/")
        
        break;

    default:
        break;
}
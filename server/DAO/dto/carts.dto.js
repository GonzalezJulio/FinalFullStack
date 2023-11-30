import crypto from "crypto";
import args from "../../config/args.js"

export default class CartsDTO {
    constructor(obj) {
        this.products = obj.products;
        
           
        if(args.mode==="dev") {
            this._id = crypto.randomBytes(12).toString('hex')
        }
    }
}
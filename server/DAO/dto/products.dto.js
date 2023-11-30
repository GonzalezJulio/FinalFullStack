import crypto from "crypto";
import args from "../../config/args.js"

export default class ProductsDTO {
    constructor(obj) {
        this.title = obj.title;
        this.description = obj.description;
        this.price = obj.price;
        this.thumbnail = obj.thumbnail;
        this.stock = obj.stock;
        this.code = obj.code;
        this.category = obj.category;
        /* this.owner = obj.owner; */
        if(args.mode==="dev") {
            this._id = crypto.randomBytes(12).toString('hex')
        }
    }

    
}


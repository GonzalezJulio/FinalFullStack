import MyRouter from '../router.js'
import ProductsController from '../../controllers/products.controllers.js';
let controllers = new ProductsController()
let { create, read, readOne, update, destroy } = controllers
export default class ProductsRouter extends MyRouter {
    init() {
        this.create("/", create);
        this.read("/", read);
        this.read("/:id", readOne)
        this.update("/:id", update);
        this.destroy("/:id", destroy);


        
    }
}


import MyRouter from '../router.js'
import ProductsController from '../../controllers/products.controllers.js';
let controllers = new ProductsController()
let { create, read, update, destroy } = controllers
export default class ProductsRouter extends MyRouter {
    init() {
        this.create("/", create);
        this.read("/", read);
        this.update("/:id", update);
        this.destroy("/:id", destroy);
    }
}

/* this.read("/:id", async (req, res, next) => {
    try{
        let one = await productModel.findById(req.params.id)
        return res.status(200).json({
            message: "Product Read",
            response: one
        })
    } catch(error){
        next(error)
    }
}); */
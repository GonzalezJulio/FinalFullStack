import MyRouter from "./router.js";
import ProductsRouter from "./Api/products.router.js";

let products = new ProductsRouter()
products = products.getRouter()

export default class IndexRouter extends MyRouter {
    init() {
        this.use("/products", products)
    }
}
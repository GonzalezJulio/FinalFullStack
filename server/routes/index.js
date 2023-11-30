import MyRouter from "./router.js";
import ProductsRouter from "./Api/products.router.js";
import CartsRouter from "./Api/carts.router.js";
import UsersRouter from "./Api/users.router.js";
let products = new ProductsRouter()
let carts = new CartsRouter()
let users = new UsersRouter()

products = products.getRouter()
carts = carts.getRouter()
users = users.getRouter()

export default class IndexRouter extends MyRouter {
    init() {
        this.use("/products", products)
        this.use("/carts", carts)
        this.use("/auth", users)
    }
}
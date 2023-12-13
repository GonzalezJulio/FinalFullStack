import MyRouter from "./router.js";
import ProductsRouter from "./Api/products.router.js";
import CartsRouter from "./Api/carts.router.js";
import UsersRouter from "./Api/users.router.js";
import TicketsRouter from "./Api/tickets.router.js"


let products = new ProductsRouter()
let carts = new CartsRouter()
let users = new UsersRouter()
let tickets = new TicketsRouter()


products = products.getRouter()
carts = carts.getRouter()
users = users.getRouter()
tickets = tickets.getRouter()


export default class IndexRouter extends MyRouter {
    init() {
        this.use("/products", products)
        this.use("/carts", carts)
        this.use("/auth", users)
        this.use("/tickets", tickets)
        
    }
}
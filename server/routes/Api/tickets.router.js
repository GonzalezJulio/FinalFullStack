import MyRouter from "../router.js";
import TicketsController from "../../controllers/tickets.controllers.js"
import CartsControllers from "../../controllers/carts.controllers.js";

let controller = new TicketsController();
let controllerCart = new CartsControllers();

let { getAllTickets } = controller;
let { createTicket } = controllerCart;

export default class TicketsRouter extends MyRouter {
    init(){
        this.create("/", createTicket);
        this.read("/", getAllTickets)
    }
}
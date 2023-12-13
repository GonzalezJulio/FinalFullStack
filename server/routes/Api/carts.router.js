import MyRouter from "../router.js";
import CartsControllers from "../../controllers/carts.controllers.js";
let controllers = new CartsControllers();
let { create, createAddProduct, read, readOne,  update, destroy } = controllers;

export default class CartsRouter extends MyRouter {
    init() {
        this.create("/", create);
        ;
        this.read("/", read);
        this.read("/:id", readOne);
        this.update("/:id", update);
        this.destroy("/:id", destroy);

        this.create("/:id/", createAddProduct)
    }
}
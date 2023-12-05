import MyRouter from "../router.js";
import UsersController from "../../controllers/users.controllers.js";
let controllers = new UsersController();
let { create, read, readOne, update, destroy } = controllers;
export default class UsersRouter extends MyRouter {
  init() {
    this.create("/", create);
    this.read("/", read);
    this.create("/login", readOne);
    
    this.update("/:id", update);
    this.destroy("/:id", destroy);
  }
}

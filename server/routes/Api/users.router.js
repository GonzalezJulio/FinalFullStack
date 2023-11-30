import MyRouter from "../router.js";
import UsersController from "../../controllers/users.controllers.js";
let controllers = new UsersController();
let { create, read, update, destroy } = controllers;
export default class UsersRouter extends MyRouter {
  init() {
    this.create("/", create);
    this.read("/", read);
    this.read("/:email", read);
    this.update("/:email", update);
    this.destroy("/:email", destroy);
  }
}

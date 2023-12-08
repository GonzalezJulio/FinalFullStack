import MyRouter from "../router.js";
import UsersController from "../../controllers/users.controllers.js";
import passport from "passport";
import { checkSession } from "../../utils/secure.js";


let controllers = new UsersController();
let { create, read, readOne, update, destroy } = controllers;
export default class UsersRouter extends MyRouter {
  init() {
    this.create("/", create);
    this.read("/", read);
    this.create("/login", readOne);
    this.update("/:id", update);
    this.destroy("/:id", destroy);

    this.read('/github', passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => { })
    
    this.read('/callback',
      passport.authenticate('github', { failureRedirect: '/login' }),
      async (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('http://localhost:5173/');
      });
  }
}

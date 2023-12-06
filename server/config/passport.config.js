import passport from "passport";
import local from 'passport-local'
import userModel from "../DAO/schemas/user.model.js";
import gitHubService from "passport-github2";
import "dotenv/config";
import UsersDTO from "../DAO/dto/users.dto.js";

const LocalStrategy = local.Strategy;

passport.serializeUser((user, done) => {
    done(null, user._id);
});
passport.deserializeUser(async (id, done) => {
try {
const user = await userModel.findById(id).select("_id email");
done(null, user);
}catch (error){
done(error);
}
});

passport.use(
    "register",
    new LocalStrategy(
        { usernameField: "email", passwordField: "password", passReqToCallback: true },
        async (req, userEmail, password, done) => {
        try {
            const user = await userModel.findOne({ email: userEmail });
            if (user) {
            console.log("Inicializacion de Usuario: Usuario ya existe");
            return done(null, false);
            }
            const newUser = new  UsersDTO(req.body);
            await userModel.create(newUser);
            return done(null, newUser);
        } catch (error) {
            return done(error);
        }
        }
    )
);

//login strategy
passport.use(
    "login",
    new LocalStrategy(
        { usernameField: "email", passwordField: "password" },
        async (userEmail, password, done) => {
        try {
            const user = await userModel.findOne({ email: userEmail });
            if (!user) {
            console.log("Login: Usuario no existe");
            return done(null, false);
            }
            const validate = await user.isValidPassword(password);
            if (!validate) {
            console.log("Login: Password incorrecto");
            return done(null, false);
            }
            return done(null, user);
        } catch (error) {
            return done(error);
        }
        }
    )
);

passport.use(
  "github",
    new gitHubService.Strategy(
        {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACKURL,
        },
        async (accessToken, refreshToken, profile, done) => {
        try {
            const user = await userModel.findOne({ githubId: profile.id });
            if (user) {
            return done(null, user);
            } else {
            const newUser = {
                githubId: profile.id,
                name: profile.displayName,
                username: profile.username,
                email: profile.emails[0].value,
                avatar: profile.photos[0].value,
            };
            await userModel.create(newUser);
            return done(null, newUser);
            }
        } catch (error) {
            done(error, false, error.message);
        }
        }
    )
);

export const initPassport = () => {};
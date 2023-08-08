import { Router } from "express";
import passport from "passport";
import UserController from "../controllers/user.controlllers.js";
import { passportCall } from "../middlewares/sessions.js";


const controller = new UserController();
const router = Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.get("/register-github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/profile-github", passport.authenticate("github", { scope: ["user:email"] }), controller.github);
router.get("/perfil", passportCall("jwt"), controller.perfil);
router.post("/logout", controller.logout);


export default router;

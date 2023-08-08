import Controllers from "./class.controllers.js";
import UserService from "../services/user.services.js";
import { createResponse } from "../utils/utils.js";
import { logger } from "../utils/logger.js";

const userService = new UserService();

export default class UserController extends Controllers {
  constructor(){
      super(userService)
  }  
  
  register = async (req, res, next) => {
    try {
      const token = await this.service.register (req.body);
      createResponse (res, 200, token);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };  
  
  login = async (req, res, next) => {
    try {
      const user = await this.service.login (req.body);
      createResponse(res, 200, user);
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };
  
  github = async (req, res, next) => {
    try {
      const { first_name, last_name, email, role, isGithub } = req.user;
      res.json({
        msg: "Register/Login Github OK",
        session: req.session,
        userData: {
          first_name,
          last_name,
          email,
          role,
          isGithub,
        },
      });
    } catch (error) {
      logger.error(error);
      next(error);
    }
  };

  perfil = async (req, res, next) => {
    try {
      const { first_name, last_name, email, role } = req.user;
      createResponse(res, 200, {
          first_name,
          last_name,
          email,
          role
      })
  } catch (error) {
    logger.error(error);
      next(error.message)
  }
  }
  
  logout = async (req, res, next) => {
    try {
      req.session.destroy((err) => {
        if (err) {
            console.log(err);
        } else{
            res.send("logout");
        };
    });
      //res.clearCookie("token").send("logout");
    } catch (error) {
      logger.error(error);
    }
  };

}

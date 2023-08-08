import { userModel } from "../models/UsersModels.js";
import { createHash, isValidPassword } from "../../../../utils/utils.js";
import { generateToken } from "../../../../middlewares/auth.js";
import CartDao from "./cart.manager.js";
import MongoDao from "../mongo.dao.js";
import { logger } from "../../../../utils/logger.js";

const cartDao = new CartDao ();

export default class UserManager extends MongoDao {
  constructor() {
    super (userModel)
  }

  async register (user) {
    try {
      const { first_name, last_name, email, age, password, role } = user;
      const existUser = await this.model.find({ email });
      if (existUser.length === 0) {
        if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
          return await this.model.create({
            ...user,
            password: createHash(password),
            role: "admin",
          });
        } else {
          const newCart = await cartDao.addCart ();
          const newUser = await this.model.create ({
            ...user,
            password: createHash(password),
            role: "user",
            cart: newCart._id
          });
          const token = generateToken (newUser);
          return token;
        }
      } else {
        return null;
      }
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.model.findOne({ email });
      if (userExist) {
        const passValid = isValidPassword(password, userExist);
        if (!passValid) return false;
        else {
          const token = generateToken (userExist);
          return token;
        }
      }
      return false;
    } catch (error) {
      logger.error(error);
      throw new Error(error);
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await this.model.findOne({ email });
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      logger.error(error);
      throw new Error(error.message);
    }
  }
}

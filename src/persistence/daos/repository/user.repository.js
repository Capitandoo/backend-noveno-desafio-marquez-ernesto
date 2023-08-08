import factory from "../factory.js";
import UserDTO from "../../dtos/user/user.dto.js";

const { userManager } = factory;

export default class UserRepository {
  constructor() {
    this.dao = userManager;
  }

  async register(user) {
    let userDBFormat = new UserDTO(user);
    return await this.dao.create(userDBFormat);
  }

  async getUser(email) {
    return await this.dao.get(email);
  }

}

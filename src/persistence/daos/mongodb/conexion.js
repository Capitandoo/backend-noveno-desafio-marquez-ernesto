import mongoose from "mongoose";
import config from "../../../../config.js";
import { logger } from "../../../utils/logger.js";

const connectionString = config.MONGO_URL;

export const initMongoDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("Conectado a la base de datos de MongoDB");
  } catch (error) {
    logger.error(error);
  }
}


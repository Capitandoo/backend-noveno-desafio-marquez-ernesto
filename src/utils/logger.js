import winston from "winston";
import "winston-mongodb";
import config from "../../config.js";

const logConfiguration = {  
  transports: [
    winston.add(
      new winston.transports.MongoDB({
        options: { useUnifiedTopology: true },
        db: config.MONGO_URL,
        collection: "logs",
        tryReconnect: true,
        level: "error",
      })
    ),
    new winston.transports.Console({
      level: "silly",
      format: winston.format.combine(
        winston.format.timestamp({ format: "MM-DD-YYYY HH:mm:ss" }),
        winston.format.colorize(),
        winston.format.printf((info) => `${info.level} | ${[info.timestamp]} | ${info.message}`)
      )
  }),

    new winston.transports.File({
      filename: "./logs.log",
      level: "info",
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);

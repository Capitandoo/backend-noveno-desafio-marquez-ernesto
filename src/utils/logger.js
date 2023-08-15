import winston from "winston";
import "winston-mongodb";
import config from "../../config.js";

let logger;

const logLevels = {
  fatal: 0,
  error: 1,
  warning: 2,
  info: 3,
  http: 4,
  debug: 5,
};

if (config.NODE_ENV === "dev") {
  logger = winston.createLogger({
    level: "debug",
    levels: logLevels,
    transports: [new winston.transports.Console()],
  });
}

if (config.NODE_ENV === "prod") {
  logger = winston.createLogger({
    levels: logLevels,
    transports: [
      new winston.transports.Console({ level: "info" }),
      new winston.transports.File({ filename: "./errors.log", level: "error" }),
    ],
  });
}

export { logger };

/*const logConfiguration = {  
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

export const logger = winston.createLogger(logConfiguration);*/

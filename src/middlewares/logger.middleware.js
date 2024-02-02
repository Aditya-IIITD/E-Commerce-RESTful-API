import fs from "fs";
import winston from "winston";

// async function log(logData) {
//   logData = `[LOG]: ${new Date().toString()} - ${logData}` + `\n`;
//   try {
//     await fsPromise.appendFile("log.txt", logData);
//   } catch (err) {
//     console.log(err);
//   }
// }

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { service: "requesting-logging" },
  transports: [new winston.transports.File({ filename: "log.txt" })],
});

const loggerMiddleware = async (req, res, next) => {
  if (!req.url.includes("signin")) {
    const logData = `${req.url} -  ${JSON.stringify(req.body)}`;
    logger.info(logData);
  }
  next();
};

export default loggerMiddleware;

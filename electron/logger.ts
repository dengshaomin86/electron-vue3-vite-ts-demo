/**
 * logger
 */

import fs from "fs-extra";
import path from "path";
import moment from "moment";

type MSG_TYPE = "INFO" | "WARNING" | "ERROR" | "SUCCESS";

const dest = path.join("d:", "logger.log");

const format = (type: MSG_TYPE = "INFO", ...msg: string[]) => {
  return `[${moment().format("yyyy-MM-DD HH:mm:ss")}][${type}]${msg}`;
};

const writeLog = (content: string) => {
  fs.appendFileSync(dest, content, "utf8");
};

const logger = (...msg: string[]) => logger.info(...msg);
logger.info = (...msg: string[]) => writeLog(format("INFO", ...msg));
logger.warning = (...msg: string[]) => writeLog(format("WARNING", ...msg));
logger.error = (...msg: string[]) => writeLog(format("ERROR", ...msg));
logger.success = (...msg: string[]) => writeLog(format("SUCCESS", ...msg));

export default logger;

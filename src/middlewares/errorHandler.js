import { createResponse } from "../utils/utils.js";
import { logger } from "../utils/logger.js";

export const errorHandler = (error, req, res, next) => {
    logger.error( `error ${error.message}`) 
    const status = error.status || 400
    createResponse(res, status, error.message)
}

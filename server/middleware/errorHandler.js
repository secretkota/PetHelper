import logger from "../utils/logger.js"

export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode
    const message = err.message
    
    logger.error(`${req.method} ${req.originalUrl} - ${message}`, { stack: err.stack })



    res.status(statusCode).json({
        "error": statusCode,
        "message": message
    })
}
import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR
    const msg = err.msg || 'something went wrong, try again later';
    res.status(statusCode).json({ msg });
}

export default errorHandlerMiddleware
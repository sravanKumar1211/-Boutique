import HandleError from "../utils/handleError.js";

const errorMiddleware = (err, req, res, next) => {

  // MongoDB CastError (invalid ObjectId)
  if (err.name === "CastError") {
    const message = `Invalid resource: ${err.path}`;
    err = new HandleError(message, 400);
  }

  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;


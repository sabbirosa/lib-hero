import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

interface CustomError extends Error {
  statusCode?: number;
  code?: number;
  name: string;
  errors?: Record<string, any>;
}

const errorMiddleware: ErrorRequestHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let error: CustomError = { ...err };

    error.message = err.message;

    console.error(err);

    // Mongoose bad ObjectId
    if (err.name === "CastError") {
      error = {
        name: "CastError",
        message: "Resource not found",
        statusCode: 404,
      } as CustomError;
    }

    // Mongoose duplicate key
    if ((err as any).code === 11000) {
      error = {
        name: "MongoError",
        message: "Duplicate field value entered",
        statusCode: 400,
      } as CustomError;
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      error = {
        ...err,
        message: "Validation failed",
        statusCode: 400,
        name: "ValidationError",
      };
    }

    res.status(error.statusCode || 500).json({
      message: error.message || "Server Error",
      success: false,
      error: error.name === "ValidationError" ? error : err,
    });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;

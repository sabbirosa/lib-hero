import { ErrorRequestHandler, NextFunction, Request, Response } from "express";

export interface CustomError extends Error {
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
    // console.error(err);

    res.status(err.statusCode || 400).json({
      message: "Validation failed",
      success: false,
      error: {
        name: err.name || "ValidationError",
        errors: err.errors,
      },
    });
  } catch (internalError) {
    next(internalError);
  }
};

export default errorMiddleware;

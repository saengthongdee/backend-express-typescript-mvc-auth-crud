import type { Request, Response, NextFunction } from "express";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  err.statusCode = err.statusCode || 500;

  res.status(err.statusCode).json({
    message: err.message || "Somthing went wrong",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

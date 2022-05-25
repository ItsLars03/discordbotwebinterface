import { NextFunction, Request, Response } from "express";
import config from "../config";

export default function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(res.statusCode !== 200 ? res.statusCode : 500).json({
    message: err.message,
    stack: config.production ? "" : err.stack,
  });
}

import express from "express";

export const errorHandler = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.json({ success: false, message: err.message, data: null });
};

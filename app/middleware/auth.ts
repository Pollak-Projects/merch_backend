import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Await from a different backend service
  next();
};

export default authMiddleware;

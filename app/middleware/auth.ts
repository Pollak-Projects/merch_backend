import { Request, Response, NextFunction } from "express";
import axios from  "axios";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];

      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }

      const response = await axios.post(
        "https://api.huszka.xyz/validate-token",
        { token }
      );

      if (response.status === 200) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized" });
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }




};

export default authMiddleware;

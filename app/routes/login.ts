import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import authMiddleware from "../middleware/auth";
const loginRouter = Router();
const prisma = new PrismaClient();

loginRouter.get(
  "/login",
  async (req, res) => {
    await prisma.user
      .create({
        data: {
          email: "asd21",
          password: "asd",
          name: "fdsgdfgdfg",
        },
      })
      .catch((err: Error) => {
        console.log(err);
      });
    res.send("User logged in");
  },
);

export default loginRouter;

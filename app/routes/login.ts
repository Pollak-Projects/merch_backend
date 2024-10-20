import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const loginRouter = Router();
const prisma = new PrismaClient();

loginRouter.get("/login", async (req, res) => {
  // send to different backend service

  res.send("User logged in");
});

export default loginRouter;

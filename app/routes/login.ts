import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../logger/logger";
const prisma = new PrismaClient();
const loginRouter = Router();
const log = logger("router:login")
/**
 * @openapi
 * /api/login:
 *  get:
 *    description: Send login requests to here WORK IN PROGRESS DOES NOT DO ANYTHING
 *    responses:
 *      200:
 *        description: Success
 */
loginRouter.get("/login", async (req, res) => {
  // send to different backend service
  log.info("This is not implemented yet")
  res.send("User logged in");
});

export default loginRouter;

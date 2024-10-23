import { Router } from "express";
import logger from "../logger/logger";

const registerRouter = Router();
const log = logger("router:register")

/**
 * @openapi
 * /api/register:
 *  get:
 *    description: Send register requests to here WORK IN PROGRESS DOES NOT DO ANYTHING
 *    responses:
 *      200:
 *        description: Success
 */
registerRouter.post("/register", (req, res) => {
  // send to different backend service
  log.info("This is not implemented yet")
  res.send("User registered");
});

export default registerRouter;

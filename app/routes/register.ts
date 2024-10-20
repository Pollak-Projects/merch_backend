import { Router } from "express";

const registerRouter = Router();

registerRouter.post("/register", (req, res) => {
  // send to different backend service
  res.send("User registered");
});

export default registerRouter;

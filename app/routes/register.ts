import { Router } from "express";

const registerRouter = Router();

registerRouter.post("/register", (req, res) => {
  // Registration logic here
  res.send("User registered");
});

export default registerRouter;

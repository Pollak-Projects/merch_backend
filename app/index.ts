import express, { Express } from "express";
import dotenv from "dotenv";
import authMiddleware from "./middleware/auth";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api", registerRouter);
app.use("/api", loginRouter);

app.get("/protected", authMiddleware, (req, res) => {
  res.send("This is a protected route");
});

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

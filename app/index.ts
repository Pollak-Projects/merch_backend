import express, { Express } from "express";
import dotenv from "dotenv";
import authMiddleware from "./middleware/auth";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import orderRouter from "./routes/order";
import itemRouter from "./routes/item";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api", authMiddleware, registerRouter);
app.use("/api", authMiddleware, loginRouter);

app.use("/api", authMiddleware, orderRouter);
app.use("/api", authMiddleware, itemRouter);

console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_USER:", process.env.DB_USER);
console.log("DB_PASSWORD:", process.env.DB_PASSWORD);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

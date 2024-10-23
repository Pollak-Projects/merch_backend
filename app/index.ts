import express, { Express } from "express";
import dotenv from "dotenv";
import logger from "./logger/logger"
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import authMiddleware from "./middleware/auth";
import loginRouter from "./routes/login";
import registerRouter from "./routes/register";
import orderRouter from "./routes/order";
import itemRouter from "./routes/item";

dotenv.config();

const log = logger("express:server")

const app: Express = express();
const port = process.env.PORT || 3000;

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Merch backend',
      version: '1.0.0',
    },
  },
  apis: ['./app/routes/*', './app/index.ts'],
};

const openapiSpecification = swaggerJsdoc(options);

app.use(express.json());

/**
 * @openapi
 * /:
 *  get:
 *    description: Test route
 *    responses:
 *      200:
 *        description: I work
 */
app.get('/', async (req, res) => {
  res.send('I work')
})

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));

app.use("/api", authMiddleware, registerRouter);
app.use("/api", authMiddleware, loginRouter);

app.use("/api", authMiddleware, orderRouter);
app.use("/api", authMiddleware, itemRouter);

log.info("DB_HOST:", process.env.DB_HOST);
log.info("DB_USER:", process.env.DB_USER);
log.info("DB_PASSWORD:", process.env.DB_PASSWORD);

app.listen(port, () => {
  log.info(`[server]: Server is running at http://localhost:${port}`);
});

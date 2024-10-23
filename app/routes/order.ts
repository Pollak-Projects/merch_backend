import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../logger/logger";
const prisma = new PrismaClient();
const orderRouter = Router();
const log = logger("router:order");

/**
 * @openapi
 * /api/order/{userId}:
 *   get:
 *     description: Get orders by user ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the orders
 */
orderRouter.get("/order/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: {
        userId: userId,
      },
      include: {
        orderItems: true,
      },
    });
    res.json(orders);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

/**
 * @openapi
 * /api/order:
 *   post:
 *     description: Create order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     itemId:
 *                       type: string
 *                     quantity:
 *                       type: integer
 *     responses:
 *       200:
 *         description: Returns the created order
 */
orderRouter.post("/order", async (req, res) => {
  const { userId, items } = req.body;
  try {
    const order = await prisma.order.create({
      data: {
        userId: userId,
        status: "PENDING",
        orderItems: {
          create: items.map((item: { itemId: string; quantity: number }) => ({
            itemId: item.itemId,
            quantity: item.quantity,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });
    res.json(order);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

/**
 * @openapi
 * /api/order/{orderId}:
 *   put:
 *     description: Update order status
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Returns the updated order
 */
orderRouter.put("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
      include: {
        orderItems: true,
      },
    });
    res.json(order);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

/**
 * @openapi
 * /api/order/{orderId}:
 *   delete:
 *     description: Delete order
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the deleted order
 */
orderRouter.delete("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await prisma.order.delete({
      where: {
        id: orderId,
      },
      include: {
        orderItems: true,
      },
    });
    res.json(order);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

export default orderRouter;
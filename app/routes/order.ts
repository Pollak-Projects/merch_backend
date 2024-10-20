import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const orderRouter = Router();
const prisma = new PrismaClient();

orderRouter.get("/order/:userId", async (req, res) => {
  const { userId } = req.params;
  const orders = await prisma.order.findMany({
    where: {
      userId: userId,
    },
  });
  res.json(orders);
});

orderRouter.post("/order", async (req, res) => {
  const { userId, productId, quantity } = req.body;
  const order = await prisma.order.create({
    data: {
      userId: userId,
      productId: parseInt(productId),
      quantity: parseInt(quantity),
    },
  });
  res.json(order);
});

orderRouter.put("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const order = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status,
    },
  });
  res.json(order);
});

orderRouter.delete("/order/:orderId", async (req, res) => {
  const { orderId } = req.params;
  const order = await prisma.order.delete({
    where: {
      id: orderId,
    },
  });
  res.json(order);
});

export default orderRouter;

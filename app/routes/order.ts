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
    include: {
      orderItems: true,
    },
  });
  res.json(orders);
});

orderRouter.post("/order", async (req, res) => {
  const { userId, items } = req.body; // items should be an array of { itemId, quantity }
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
    include: {
      orderItems: true,
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
    include: {
      orderItems: true,
    },
  });
  res.json(order);
});

export default orderRouter;

import { Router } from "express";
import { PrismaClient } from "@prisma/client";
const itemRouter = Router();
const prisma = new PrismaClient();

//create item
itemRouter.post("/item", async (req, res) => {
  const { name, price, quantity } = req.body;
  const item = await prisma.item.create({
    data: {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    },
  });
  res.json(item);
});

//get all items
itemRouter.get("/item", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

//get item by id
itemRouter.get("/item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const item = await prisma.item.findUnique({
    where: {
      id: parseInt(itemId),
    },
  });
  res.json(item);
});

//update item

itemRouter.put("/item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { name, price, quantity } = req.body;
  const item = await prisma.item.update({
    where: {
      id: parseInt(itemId),
    },
    data: {
      name,
      price: parseFloat(price),
      quantity: parseInt(quantity),
    },
  });
  res.json(item);
});

//delete item

itemRouter.delete("/item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const item = await prisma.item.delete({
    where: {
      id: parseInt(itemId),
    },
  });
  res.json(item);
});

export default itemRouter;

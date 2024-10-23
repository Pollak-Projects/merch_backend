import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import logger from "../logger/logger";
const prisma = new PrismaClient();
const itemRouter = Router();
const log = logger("router:item")

/**
 * @openapi
 * /api/item:
 *   post:
 *     description: Create item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Returns the created item
 */
itemRouter.post("/item", async (req, res) => {
  const { name, price, quantity } = req.body;
  try {
    const item = await prisma.item.create({
      data: {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      },
    });
    res.json(item);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

/**
 * @openapi
 * /api/item:
 *   get:
 *     description: Get all items
 *     responses:
 *       200:
 *         description: Returns all items
 */
itemRouter.get("/item", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

/**
 * @openapi
 * /api/item/{itemId}:
 *   get:
 *     description: Get item by ID
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the item
 */
itemRouter.get("/item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await prisma.item.findUnique({
      where: {
        id: itemId,
      },
    });
    res.json(item);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

/**
 * @openapi
 * /api/item/{itemId}:
 *   put:
 *     description: Update item
 *     parameters:
 *       - name: itemId
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
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               quantity:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Returns the updated item
 */
itemRouter.put("/item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  const { name, price, quantity } = req.body;
  try {
    const item = await prisma.item.update({
      where: {
        id: itemId,
      },
      data: {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
      },
    });
    res.json(item);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

/**
 * @openapi
 * /api/item/{itemId}:
 *   delete:
 *     description: Delete item
 *     parameters:
 *       - name: itemId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Returns the deleted item
 */
itemRouter.delete("/item/:itemId", async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await prisma.item.delete({
      where: {
        id: itemId,
      },
    });
    res.json(item);
  } catch (e) {
    log.error(e);
    res.status(500).send("Smth went wrong");
  }
});

export default itemRouter;
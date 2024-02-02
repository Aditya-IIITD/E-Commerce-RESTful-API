import CartItemsController from "./cartItems.controller.js";
import express from "express";

const cartItemController = new CartItemsController();
const cartRouter = express.Router();

cartRouter.post("/", cartItemController.add);
cartRouter.get("/", cartItemController.get);
cartRouter.delete("/:id", cartItemController.delete);
export default cartRouter;

import CartItemsController from "./cartItems.controller.js";
import express from "express";

const cartItemController = new CartItemsController();
const cartRouter = express.Router();

cartRouter.post("/", (req, res) => {
  cartItemController.add(req, res);
});
cartRouter.get("/", (req, res) => {
  cartItemController.get(req, res);
});
cartRouter.delete("/:id", (req, res) => {
  cartItemController.delete(req, res);
});
export default cartRouter;

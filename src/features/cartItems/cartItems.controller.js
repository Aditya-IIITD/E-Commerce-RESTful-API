import CartItemModel from "./cartItems.model.js";
import CartItemsRepository from "./cartItems.repository.js";

export default class CartItemsController {
  constructor() {
    this.cartItemsRepository = new CartItemsRepository();
  }
  async add(req, res) {
    const { productId, quantity } = req.body;
    const userId = req.userId;
    try {
      await this.cartItemsRepository.add(productId, userId, quantity);
      res.status(201).send("Cart is updated");
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  }

  async get(req, res) {
    const userId = req.userId;
    try {
      const items = await this.cartItemsRepository.get(userId);
      return res.status(200).send(items);
    } catch (err) {
      console.log(err);
      res.status(500).send("Something went wrong");
    }
  }

  async delete(req, res) {
    const userId = req.userId;
    const cartItemId = req.params.id;
    try {
      const result = await this.cartItemsRepository.delete(userId, cartItemId);
      if (!result) {
        return res.status(404).send(error);
      } else {
        return res.status(200).send("Cart item is removed");
      }
    } catch (err) {
      console.log(err);
      res.status(400).send("Item not found");
    }
  }
}

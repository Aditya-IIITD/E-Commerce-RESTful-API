import CartItemModel from "./cartItems.model.js";

export default class CartItemsController {
  add(req, res) {
    const { productId, quantity } = req.query;
    const userId = req.userId;
    const product = CartItemModel.addProduct(productId, userId, quantity);
    res.status(201).send("Cart is updated");
  }

  get(req, res) {
    const userId = req.userId;
    const items = CartItemModel.getProducts(userId);
    return res.status(200).send(items);
  }

  delete(req, res) {
    const userId = req.userId;
    const cartItemId = req.params.id;
    const error = CartItemModel.deleteProduct(cartItemId, userId);
    if (error) {
      return res.status(404).send(error);
    } else {
      return res.status(200).send("Cart item is removed");
    }
  }
}

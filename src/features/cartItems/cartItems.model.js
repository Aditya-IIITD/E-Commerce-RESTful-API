export default class CartItemModel {
  constructor(productId, userId, quantity) {
    this.productId = productId;
    this.userId = userId;
    this.quantity = quantity;
  }

  static addProduct(productId, userId, quantity) {
    const cartItem = new CartItemModel(productId, userId, quantity);
    cartItem.id = cartItems.length + 1;
    cartItems.push(cartItem);
    return cartItem;
  }

  static getProducts(userId) {
    const products = cartItems.filter((i) => i.userId == userId);
    return products;
  }

  static deleteProduct(cartItemID, userId) {
    const cartItemIndex = cartItems.findIndex(
      (i) => i.productId == cartItemID && i.userId == userId
    );
    if (cartItemIndex == -1) {
      return "Product not found";
    } else {
      cartItems.splice(cartItemIndex, 1);
    }
  }
}

var cartItems = [new CartItemModel(1, 2, 1, 1), new CartItemModel(1, 1, 2, 2)];

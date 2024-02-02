import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";
import { UserModel } from "../user/user.model.js";

export default class ProductModel {
  constructor(name, desc, price, imageUrl, category, sizes, id) {
    this._id = id;
    this.name = name;
    this.desc = desc;
    this.imageUrl = imageUrl;
    this.category = category;
    this.price = price;
    this.sizes = sizes;
  }

  static getAll() {
    return products;
  }

  static add(product) {
    product.id = products.length + 1;
    products.push(product);
    return product;
  }

  static get(id) {
    const product = products.find((p) => p.id == id);
    return product;
  }

  static filter(minprice, maxprice, category) {
    const res = products.filter(
      (p) =>
        (!minprice || p.price >= minprice) &&
        (!maxprice || p.price <= maxprice) &&
        (!category || p.category == category)
    );

    return res;
  }

  static rateProduct(userId, productId, rating) {
    //check if user present
    const user = UserModel.getAll().find((u) => u.id == userId);
    if (!user) {
      throw new ApplicationError("User not found", 400);
    }

    //check if product present
    const product = products.find((p) => p.id == productId);
    if (!product) {
      throw new ApplicationError("Product not found", 400);
    }

    //if the product dont have ratings
    if (!product.ratings) {
      product.ratings = [];
      product.ratings.push({
        userId: userId,
        rating: rating,
      });
    } else {
      const existingRatingIndex = product.ratings.findIndex(
        (u) => u.userId == userId
      );

      if (existingRatingIndex >= 0) {
        product.ratings[existingRatingIndex] = {
          userId: userId,
          rating: rating,
        };
      } else {
        product.ratings.push({
          userId: userId,
          rating: rating,
        });
      }
    }
  }
}

var products = [
  new ProductModel(
    1,
    "Product 1",
    "Description for Product 1",
    19.99,
    "https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg",
    "category1"
  ),
  new ProductModel(
    2,
    "Product 2",
    "Description for Product 2",
    29.99,
    "https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg",
    "category2",
    ["M", "XL"]
  ),
  new ProductModel(
    3,
    "Product 3",
    "Description for Product 3",
    39.99,
    "https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg",
    "category3",
    ["M", "S", "XL"]
  ),
];

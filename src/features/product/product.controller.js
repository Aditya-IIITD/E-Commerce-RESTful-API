import { UserModel } from "../user/user.model.js";
import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.getAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };

    console.log(newProduct);
    const createdRecord = ProductModel.add(newProduct);
    res.status(201).send(createdRecord);
  }

  rateProduct(req, res) {
    const userId = req.query.userId;
    const productId = req.query.productId;
    const rating = req.query.rating;
    const error = ProductModel.rateProduct(userId, productId, rating);

    if (error) {
      return res.status(400).send(error);
    } else {
      return res.status(200).send("rating has been added");
    }
  }

  getOneProduct(req, res) {
    const product = ProductModel.get(req.params.id);
    if (!product) {
      res.status(404).send("Product not found");
    } else {
      res.status(200).send(product);
    }
  }

  filterProducts(req, res) {
    const minp = req.query.minprice;
    const maxp = req.query.maxprice;
    const category = req.query.category;
    const result = ProductModel.filter(minp, maxp, category);
    res.status(200).send(result);
  }
}

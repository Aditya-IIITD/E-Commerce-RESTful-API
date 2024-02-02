import ProductModel from "./product.model.js";
import ProductRepository from "./product.respository.js";

export default class ProductController {
  constructor() {
    this.productRespository = new ProductRepository();
  }

  async getAllProducts(req, res) {
    try {
      const products = await this.productRespository.getAll();
      res.status(200).send(products);
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with DB");
    }
  }

  async addProduct(req, res) {
    try {
      const { name, price, sizes } = req.body;
      const newProduct = new ProductModel(
        name,
        null,
        parseFloat(price),
        req.file.filename,
        null,
        sizes.split(",")
      );

      const createdRecord = await this.productRespository.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with DB");
    }
  }

  rateProduct(req, res, next) {
    const userId = req.query.userId;
    const productId = req.query.productId;
    const rating = req.query.rating;
    try {
      ProductModel.rateProduct(userId, productId, rating);
      return res.status(200).send("rating has been added");
    } catch (error) {
      next(error);
    }
  }

  async getOneProduct(req, res) {
    try {
      const product = await this.productRespository.get(req.params.id);
      if (!product) {
        res.status(404).send("Product not found");
      } else {
        res.status(200).send(product);
      }
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with DB");
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

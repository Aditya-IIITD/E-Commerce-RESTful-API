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
    console.log("in add");
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
      console.log(newProduct);
      const createdRecord = await this.productRespository.add(newProduct);
      res.status(201).send(createdRecord);
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with DB");
    }
  }

  async rateProduct(req, res) {
    const userId = req.userId;
    const productId = req.body.productId;
    const rating = req.body.rating;
    try {
      await this.productRespository.rate(userId, productId, rating);
      return res.status(200).send("rating has been added");
    } catch (error) {
      console.log(err);
      throw new Error("Something went wrong with DB");
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

  async filterProducts(req, res) {
    try {
      const minp = req.query.minprice;
      const maxp = req.query.maxprice;
      const category = req.query.category;
      const result = await this.productRespository.filter(minp, maxp, category);
      res.status(200).send(result);
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with DB");
    }
  }
}

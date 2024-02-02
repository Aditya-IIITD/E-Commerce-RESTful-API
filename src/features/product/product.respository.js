import { ObjectId } from "mongodb";
import getDB from "../../config/mongodb.js";
import { ApplicationError } from "../../middlewares/ApplicationError.middleware";

class ProductRepository {
  constructor() {
    this.collection = "Products";
  }
  async add(newProduct) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const products = await collection.find().toArray();
      return products;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return collection.findOne({ _id: new ObjectId(id) });
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default ProductRepository;

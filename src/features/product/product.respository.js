import { ObjectId } from "mongodb";
import getDB from "../../config/mongodb.js";
import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";

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
      console.log(products);
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

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = { $lte: parseFloat(maxPrice) };
      }
      if (category) {
        filterExpression.category = category;
      }

      const products = await collection.find(filterExpression).toArray();
      return products;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async rate(userID, productId, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const rated = await collection.updateOne(
        {
          _id: new ObjectId(productId),
        },
        {
          $push: { ratings: { userID: userID, rating: rating } },
        }
      );
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

export default ProductRepository;

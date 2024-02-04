import getDB from "../../config/mongodb.js";
import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";
import { ObjectId } from "mongodb";
export default class CartItemsRepository {
  constructor() {
    this.collection = "cartItems";
  }
  async add(productId, userId, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const id = await this.getNextCounter(db);
      await collection.updateOne(
        {
          productId: new ObjectId(productId),
          userId: new ObjectId(userId),
        },
        { $setOnInsert: { _id: id }, $inc: { quantity: parseInt(quantity) } },
        { upsert: true }
      );
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with DB", 500);
    }
  }

  async get(userId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const products = await collection
        .find({ userId: new ObjectId(userId) })
        .toArray();
      return products;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with DB", 500);
    }
  }

  async delete(userId, cartItemId) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      const result = await collection.deleteOne({
        _id: new ObjectId(cartItemId),
        userId: new ObjectId(userId),
      });
      return result.deletedCount > 0 ? true : false;
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong with DB", 500);
    }
  }

  async getNextCounter(db) {
    const counter = await db
      .collection("Counters")
      .findOneAndUpdate(
        { _id: "cartItemId" },
        { $inc: { value: 1 } },
        { returnNewDocument: true }
      );
    return counter.value;
  }
}

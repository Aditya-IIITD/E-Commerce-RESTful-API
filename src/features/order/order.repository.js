import getDB from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";
import OrderModel from "./order.model.js";
import { getClient } from "../../config/mongodb.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  }

  async placeOrder(userId) {
    const client = getClient();
    const session = client.startSession();
    try {
      const db = getDB();

      session.startTransaction();
      //calculate total amount of order
      const items = await this.getTotalAmount(userId, session);
      const finalAmount = await items.reduce(
        (acc, item) => acc + item.totalAmount,
        0
      );

      //create order record
      const newOrder = new OrderModel(
        new ObjectId(userId),
        finalAmount,
        new Date()
      );
      await db.collection(this.collection).insertOne(newOrder, { session });

      //reduce the stock
      for (let item of items) {
        await db
          .collection("Products")
          .updateOne(
            { _id: item.productId },
            { $inc: { stock: -item.quantity } },
            { session }
          );
      }

      //clear the cart Items
      await db
        .collection("cartItems")
        .deleteMany({ userId: new ObjectId(userId) }, { session });

      await session.commitTransaction();
      session.endSession();
    } catch (err) {
      await session.abortTransaction();
      session.endSession();
      console.log(err);
      throw new ApplicationError("Something went wrong with DB", 500);
    }
  }

  async getTotalAmount(userId, session) {
    try {
      const db = getDB();
      const items = await db
        .collection("cartItems")
        .aggregate(
          [
            //find cartItems of user
            {
              $match: { userId: new ObjectId(userId) },
            },
            //for all fetched cart items
            {
              $lookup: {
                from: "Products",
                localField: "productId",
                foreignField: "_id",
                as: "productInfo",
              },
            },

            // //unwinde productinfo
            {
              $unwind: "$productInfo",
            },

            // //calculate total amount for all items in cart
            {
              $addFields: {
                totalAmount: {
                  $multiply: ["$productInfo.price", "$quantity"],
                },
              },
            },
          ],
          { session }
        )
        .toArray();

      return items;
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something went wrong with Total price pipeline",
        500
      );
    }
  }
}

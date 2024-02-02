import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";
import getDB from "../../config/mongodb.js";
export class UserRepository {
  async signup(newuser) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      await collection.insertOne(newuser);
      return newuser;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async findUserUsingEmail(email) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      return await collection.findOne({ email: email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

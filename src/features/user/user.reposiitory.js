import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";
import getDB from "../../config/mongodb.js";
export class UserRepository {
  constructor() {
    this.collection = "users";
  }
  async signup(newuser) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      await collection.insertOne(newuser);
      return newuser;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async findUserUsingEmail(email) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      return await collection.findOne({ email: email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }
}

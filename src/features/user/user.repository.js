import mongoose from "mongoose";
import userSchema from "./user.schema.js";
import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";

const userModel = mongoose.model("User", userSchema);

export class UserRepository {
  async signup(user) {
    try {
      const newUser = new userModel(user);
      await newUser.save();
      return newUser;
    } catch (err) {
      if (err instanceof mongoose.Error.ValidationError) {
        throw err;
      } else {
        throw new ApplicationError("Something went wrong with database", 500);
      }
    }
  }

  async signin(email, password) {
    try {
      return await userModel.findOne({ email, password });
    } catch (err) {
      throw new ApplicationError("Something went wrong with database", 500);
    }
  }

  async findUserUsingEmail(email) {
    try {
      return await userModel.findOne({ email });
    } catch (err) {
      console.log(err);
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  async resetPassword(userId, hashedPassword) {
    try {
      let user = await userModel.findById(userId);
      if (user) {
        user.password = hashedPassword;
        await user.save();
      } else {
        throw new Error("No such user found");
      }
    } catch (err) {
      console.log(err);
      throw new ApplicationError(
        "Something went wrong while resetting password",
        500
      );
    }
  }
}

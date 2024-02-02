import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";
import { UserRepository } from "./user.reposiitory.js";
import bcrypt from "bcrypt";

export class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signUp(req, res) {
    const { name, email, password, type } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 12);
      const newuser = new UserModel(name, email, hashedPassword, type);
      const user = await this.userRepository.signup(newuser);
      res.status(201).send(newuser);
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with DB");
    }
  }

  async signIn(req, res) {
    try {
      const user = await this.userRepository.findUserUsingEmail(req.body.email);
      if (!user) {
        res.status(400).send("Incorrect credentials");
      } else {
        const passMatched = await bcrypt.compare(
          req.body.password,
          user.password
        );
        if (passMatched) {
          const token = jwt.sign(
            { userid: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );
          //send token to client
          return res.status(200).send(token);
        } else {
          res.status(400).send("Incorrect credentials");
        }
      }
    } catch (err) {
      console.log(err);
      throw new Error("Something went wrong with DB");
    }
  }
}

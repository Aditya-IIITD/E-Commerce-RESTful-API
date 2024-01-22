import { UserModel } from "./user.model.js";
import jwt from "jsonwebtoken";

export class UserController {
  signUp(req, res) {
    const { name, email, password, type } = req.body;
    const user = UserModel.signup(name, email, password, type);
    res.status(201).send(user);
  }

  signIn(req, res) {
    const result = UserModel.signin(req.body.email, req.body.password);
    if (!result) {
      res.status(400).send("Incorrect credentials");
    } else {
      //create token
      const token = jwt.sign(
        { userid: result.id, email: result.email },
        "YmJW3Ix4z0xr7a9Omg3kWJ6x96d0y0Kj",
        { expiresIn: "1h" }
      );
      //send token to client
      return res.status(200).send(token);
    }
  }
}

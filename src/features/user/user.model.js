import getDB from "../../config/mongodb.js";
import { ApplicationError } from "../../middlewares/ApplicationError.middleware.js";

export class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
  }

  static async signup(name, email, pass, type) {
    try {
      const db = getDB();
      const collection = db.collection("users");
      const newuser = new UserModel(name, email, pass, type);
      await collection.insertOne(newuser);
      return newuser;
    } catch (err) {
      throw new ApplicationError("Something went wrong", 500);
    }
  }

  static signin(email, pass) {
    const user = users.find((u) => u.email == email && u.password == pass);
    return user;
  }

  static getAll() {
    return users;
  }
}

let users = [
  {
    id: 1,
    name: "Seller user",
    email: "seller@ecom.com",
    password: "password1",
    type: "seller",
  },
  {
    id: 2,
    name: "customer user",
    email: "customer@ecom.com",
    password: "password2",
    type: "customer",
  },
];

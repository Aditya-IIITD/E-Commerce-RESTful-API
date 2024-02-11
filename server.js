import "./env.js";
import express from "express";
import swagger from "swagger-ui-express";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import { jwtAuthorizer } from "./src/middlewares/jwtAuth.middleware.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import apidocs from "./swagger.json" assert { type: "json" };
import cors from "cors";
import loggerMiddleware from "./src/middlewares/logger.middleware.js";
import { ApplicationError } from "./src/middlewares/ApplicationError.middleware.js";
import { connectToMongodb } from "./src/config/mongodb.js";
import dotenv from "dotenv";
import orderRouter from "./src/features/order/order.routes.js";
import { connectUsingMongoose } from "./src/config/mongooseConfig.js";

const server = express();
dotenv.config();

server.use("/api-docs", swagger.serve, swagger.setup(apidocs));

//handleing CORS policy
server.use(cors());

server.use(express.json());

server.use(loggerMiddleware);

server.use("/api/users", userRouter);
server.use("/api/products", jwtAuthorizer, productRouter);
server.use("/api/cartItems", jwtAuthorizer, cartRouter);
server.use("/api/orders", jwtAuthorizer, orderRouter);

server.get("/", (req, res) => {
  res.status(200).send("Welcome to Ecommerce API");
});

server.use((err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.code).send(err.message);
  } else {
    res.status(500).send("Something went wrong, please try later");
  }
});

server.use((req, res) => {
  res
    .status(404)
    .send(
      "API not found. please check our documentation at localhost:3000/api-docs"
    );
});

server.listen(3000, () => {
  console.log("Server is listening at 3000...");
  // connectToMongodb();
  connectUsingMongoose();
});

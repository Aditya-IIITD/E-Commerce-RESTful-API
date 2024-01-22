import express from "express";
import swagger from "swagger-ui-express";

import productRouter from "./src/features/product/product.routes.js";
import userRouter from "./src/features/user/user.routes.js";
import { jwtAuthorizer } from "./src/middlewares/jwtAuth.middleware.js";
import cartRouter from "./src/features/cartItems/cartItems.routes.js";
import apidocs from "./swagger.json" assert { type: "json" };

const server = express();

server.use("/api-docs", swagger.serve, swagger.setup(apidocs));

//to parse req body to json
server.use(express.json());

server.use("/api/users", userRouter);
server.use("/api/products", jwtAuthorizer, productRouter);
server.use("/api/cartItems", jwtAuthorizer, cartRouter);

server.listen(3000, () => {
  console.log("Server is listening at 3000...");
});

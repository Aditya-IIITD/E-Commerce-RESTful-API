import express from "express";
import ProductController from "./product.controller.js";
import { uploadFile } from "../../middlewares/fileupload.middleware.js";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/filter", (req, res) => {
  productController.filterProducts(req, res);
});
productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.post("/", uploadFile.single("imageUrl"), (req, res) => {
  console.log("route add");
  productController.addProduct(req, res);
});

productRouter.get("/averagePrice", (req, res, next) => {
  productController.averagePrice(req, res, next);
});

productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});
productRouter.post("/rate", (req, res) => {
  productController.rateProduct(req, res);
});

export default productRouter;

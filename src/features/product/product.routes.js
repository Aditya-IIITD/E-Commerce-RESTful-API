import express from "express";
import ProductController from "./product.controller.js";
import { uploadFile } from "../../middlewares/fileupload.middleware.js";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/filter", productController.filterProducts);
productRouter.get("/", (req, res) => {
  productController.getAllProducts(req, res);
});
productRouter.post("/", uploadFile.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
});
productRouter.get("/:id", (req, res) => {
  productController.getOneProduct(req, res);
});
productRouter.post("/rate", productController.rateProduct);

export default productRouter;

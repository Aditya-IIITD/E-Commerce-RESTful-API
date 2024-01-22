import express from "express";
import ProductController from "./product.controller.js";
import { uploadFile } from "../../middlewares/fileupload.middleware.js";

const productRouter = express.Router();

const productController = new ProductController();

productRouter.get("/filter", productController.filterProducts);
productRouter.get("/", productController.getAllProducts);
productRouter.post(
  "/",
  uploadFile.single("imageUrl"),
  productController.addProduct
);
productRouter.get("/:id", productController.getOneProduct);
productRouter.post("/rate", productController.rateProduct);

export default productRouter;

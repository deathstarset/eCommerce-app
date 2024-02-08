import express from "express";
import { upload } from "../middlewares/upload";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product";

export const router = express.Router();
router.post("/", upload.single("image"), addProduct).get("/", getAllProducts);
router
  .get("/:productId", getProduct)
  .delete("/:productId", deleteProduct)
  .patch("/:productId", upload.single("image"), editProduct);

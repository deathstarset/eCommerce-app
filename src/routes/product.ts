import express from "express";
import {
  addProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProduct,
} from "../controllers/product";

export const router = express.Router();
router.post("/", addProduct).get("/", getAllProducts);
router
  .get("/:productId", getProduct)
  .delete("/:productId", deleteProduct)
  .patch("/:productId", editProduct);

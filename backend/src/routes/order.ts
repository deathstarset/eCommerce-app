import express from "express";
import {
  createOrder,
  getOrders,
  getOrder,
  deleteOrder,
  updateOrder,
} from "../controllers/order";
export const router = express.Router();
router.post("/", createOrder).get("/", getOrders);
router
  .get("/:orderId", getOrder)
  .delete("/:orderId", deleteOrder)
  .patch("/:orderId", updateOrder);

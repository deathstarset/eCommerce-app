import { orderModel } from "../models/order";
import { asyncWrapper } from "../utils/async.wrapper";
import express, { NextFunction } from "express";

export const createOrder = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const order = await orderModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Order Create Successfully",
      data: {
        order,
      },
    });
  }
);

export const getOrders = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const orders = await orderModel.find({});
    res.status(200).json({
      success: true,
      message: "Orders Found Successfully",
      data: {
        orders,
      },
    });
  }
);

export const getOrder = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { orderId } = req.params;
    const order = await orderModel.findOne({ _id: orderId });
    if (!order) {
      return next(Error("Order Not Found"));
    }
    res.status(200).json({
      success: true,
      message: "Order Found Successfully",
      data: {
        order,
      },
    });
  }
);

export const deleteOrder = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { orderId } = req.params;
    const order = await orderModel.findOneAndDelete({ _id: orderId });
    if (!order) {
      return next(Error("Order Not Found"));
    }
    res.status(200).json({
      success: true,
      message: "Order Deleted Successfully",
      data: {
        deletedOrder: order,
      },
    });
  }
);

export const updateOrder = asyncWrapper(
  async (req: express.Request, res: express.Response, next: NextFunction) => {
    const { orderId } = req.params;
    const order = await orderModel.findOneAndUpdate(
      { _id: orderId },
      req.body,
      { new: true }
    );
    if (!order) {
      return next(Error("Order Not Found"));
    }
    res.status(201).json({
      success: true,
      message: "Order Updated Successfully",
      data: {
        newOrder: order,
      },
    });
  }
);

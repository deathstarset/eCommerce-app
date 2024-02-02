import { ProductModel } from "../models/product";
import express from "express";
import { asyncWrapper } from "../utils/async.wrapper";

export const addProduct = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const product = await ProductModel.create(req.body);
    res.status(201).json({
      success: true,
      message: "Product Create Succefully",
      data: { product },
    });
  }
);

export const getAllProducts = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { sort = "price", limit = 5, page = 1 } = req.query;
    const offset = (+page - 1) * +limit;

    const products = await ProductModel.find({})
      .sort(sort as string)
      .skip(offset)
      .limit(limit as number);
    const totalProducts = await ProductModel.countDocuments();
    res.status(200).json({
      success: true,
      message: "Products Found Succefully",
      data: {
        products,
        totalPages: Math.ceil(totalProducts / +limit),
        currentPage: +page,
      },
    });
  }
);

export const getProduct = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { productId } = req.params;
    const product = await ProductModel.findOne({ _id: productId });
    if (!product) {
      return next(Error("Product Not Found"));
    }
    res.status(200).json({
      success: true,
      message: "Product Found Succefully",
      data: { product },
    });
  }
);

export const deleteProduct = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { productId } = req.params;
    const product = await ProductModel.findOneAndDelete({ _id: productId });
    if (!product) {
      return next(Error("Product Not Found"));
    }
    res.status(201).json({
      success: true,
      message: "Product Deleted Succefully",
      data: { oldProduct: product },
    });
  }
);

export const editProduct = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { productId } = req.params;
    const product = await ProductModel.findOneAndUpdate(
      { _id: productId },
      req.body,
      { new: true }
    );
    if (!product) {
      return next(Error("Product Not Found"));
    }
    res.status(200).json({
      success: true,
      message: "Product Edited Succefully",
      data: { newProduct: product },
    });
  }
);

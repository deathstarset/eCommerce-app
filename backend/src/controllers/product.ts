import { ProductModel } from "../models/product";
import express from "express";
import { asyncWrapper } from "../utils/async.wrapper";
import fs from "fs";
import path from "path";

export const addProduct = asyncWrapper(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!req.file) {
      return next(Error("please provide an image"));
    }
    const product = await ProductModel.create({
      ...req.body,
      image: req.file.filename,
    });

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
    let queryObject = { ...req.query };
    const excludeFields = ["limit", "page", "sort", "fields"];
    const filteringFeilds = ["price", "rating", "condition", "name"];

    // exclude the items that has to deal with the query itself and dealing only with the wanted filtering items
    excludeFields.forEach((item) => delete queryObject[item]);
    queryObject = Object.fromEntries(
      Object.entries(queryObject).filter((entry) =>
        filteringFeilds.includes(entry[0])
      )
    );

    // editing the query object and making it valid
    queryObject = Object.fromEntries(
      Object.entries(queryObject).map(([field, query]) => {
        if (field === "price" || field === "rating") {
          query = Object.fromEntries(
            (query as string)
              .replaceAll(/(eq|lt|lte|gt|gte)/g, (value) => `$${value}`)
              .split(",")
              .map((item) => {
                return item.split(":");
              })
          );
        } else if (field === "name") {
          query = {
            $regex: query,
            $options: "i",
          };
        }
        return [field, query];
      })
    );

    let query = ProductModel.find(queryObject);

    // Sorting
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort({ createdAt: -1 });
    }

    // Limiting fields
    if (req.query.fields) {
      const fields = (req.query.fields as string).split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // Pagination
    const page = req.query.page || 1;
    const limit = req.query.limit || 5;
    const skip = (+page - 1) * +limit;
    query = query.skip(skip).limit(+limit);

    const products = await query;
    const totalProducts = await ProductModel.countDocuments(queryObject);

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
    // deleting the image from the storage
    fs.unlink(
      path.join(__dirname, "..", "..", "uploads", product.image),
      () => {}
    );

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
    // getting the old image
    const product = await ProductModel.findById(productId);
    if (!product) {
      return next(Error("Product Not Found"));
    }
    const imageName = product.image;

    // updating the the feilds if there are ones
    const newProduct = await ProductModel.findOneAndUpdate(
      { _id: productId },
      { ...req.body, image: req.file ? req.file.filename : imageName },
      { new: true }
    );

    // deleting the old image if a new one has been set
    if (newProduct.image !== imageName) {
      fs.unlink(
        path.join(__dirname, "..", "..", "uploads", imageName),
        () => {}
      );
    }

    res.status(201).json({
      success: true,
      message: "Product Edited Succefully",
      data: { newProduct },
    });
  }
);

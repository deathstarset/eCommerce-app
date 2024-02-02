import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "product name missing"],
  },
  description: {
    type: String,
    required: [true, "product description missing"],
  },
  image: {
    type: String,
    required: [true, "product image missing"],
  },
  price: {
    type: Number,
    min: [0, "product price is below 0"],
    required: [true, "product price missing"],
  },
  rating: {
    type: Number,
    default: 5,
  },
  quantity: {
    type: Number,
    min: [0, "product quantity below 0"],
    required: [true, "product quantity missing"],
  },
  condition: {
    type: String,
    enum: ["New", "Used"],
    required: [true, "product condition missing"],
  },
});

export const ProductModel = mongoose.model("product", productSchema);
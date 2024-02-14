import mongoose from "mongoose";
import { productSchema } from "./product";

const orderSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped"],
      default: "Pending",
    },
    personal_info: {
      first_name: {
        type: String,
        trim: true,
        required: [true, "first name missing"],
        minlength: 4,
      },
      last_name: {
        type: String,
        trim: true,
        required: [true, "last name missing"],
        minlength: 4,
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "email address missing"],
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "email not valid"],
      },
      phone_number: {
        type: String,
        trim: true,
        required: [true, "phone number missing"],
        match: [
          /^(\+\d{1,2}\s?)?(\(\d{1,4}\)|\d{1,4})[-\s]?\d{1,12}([-_\s]?\d{1,5})?$/,
          "phone number not valid",
        ],
      },
      shipping_address: {
        type: String,
        required: [true, "shipping address missing"],
        minlength: 4,
      },
    },
    items: {
      type: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product",
          },
          count: {
            type: Number,
            default: 1,
            min: [0, "product count cannot be negative"],
          },
        },
      ],
    },
    total_amount: {
      type: Number,
      required: [true, "total amount missing"],
      min: [0, "amount cannot be below 0"],
    },
    archived: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export const orderModel = mongoose.model("order", orderSchema);

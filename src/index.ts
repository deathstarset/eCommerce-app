import express from "express";
import "dotenv/config";
import { connect } from "./utils/connect";
import { router as productsRouter } from "./routes/product";
import { errorHandler } from "./utils/error.handler";
const PORT = process.env.PORT || 3500;
const app = express();

app.use(express.json());
app.use("/api/v1/products", productsRouter);
app.use(errorHandler);

const start = async () => {
  try {
    await connect();
    app.listen(PORT, () => {
      console.log("Server listening on port " + PORT);
    });
  } catch (error) {
    console.log("An error occured while starting the server");
  }
};

start();

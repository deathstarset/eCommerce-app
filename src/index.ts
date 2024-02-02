import express from "express";
import "dotenv/config";
import { connect } from "./utils/connect";
import { router as productsRouter } from "./routes/product";
import { errorHandler } from "./utils/error.handler";
import cors from "cors";
const PORT = process.env.PORT || 3500;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/v1/products", productsRouter);
app.use(errorHandler);

app.all("*", (req: express.Request, res: express.Response) => {
  res
    .status(404)
    .json({ success: false, message: "Route Not Found", data: null });
});
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

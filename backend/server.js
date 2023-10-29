import dotenv from "dotenv";
dotenv.config();
import express from "express";
// import products from "./products.js";
import CONFIG from "./config/index.js";
import connectDB from "./db/db.js";
import productRoutes from "./routes/productRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is ready..");
});


app.use("/api/products", productRoutes);

app.use(notFound)
app.use(errorHandler);

app.listen(CONFIG.PORT, () => {
  console.log(`Serve at http://localhost:${CONFIG.PORT}`);
});

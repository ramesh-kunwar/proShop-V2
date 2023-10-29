import dotenv from "dotenv";
dotenv.config();
import express from "express";
import products from "./products.js";
import CONFIG from "./config/index.js";
import connectDB from "./db/db.js";

const port = process.env.PORT;
const app = express();

connectDB();

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const product = products.find((x) => x._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});

app.listen(CONFIG.PORT, () => {
  console.log(`Serve at http://localhost:${CONFIG.PORT}`);
});

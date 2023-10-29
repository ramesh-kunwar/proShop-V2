import asynchandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

export const getProducts = asynchandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }

  res.status(200).json({ products });
});

export const getSingleProduct = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

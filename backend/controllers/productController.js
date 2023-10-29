import asynchandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

/***************************************
 * @desc Fetch all products
 * @route GET /api/products
 * @access Public
 * @returns {object} - products
 *
***************************************/

export const getProducts = asynchandler(async (req, res) => {
  const products = await Product.find({});

  if (!products) {
    res.status(404);
    throw new Error("No products found");
  }

  res.status(200).json({ products });
});

/**
 * @desc Fetch single product
 * @route GET /api/products/:id
 * @access Public
 * @returns {object} - product
 *
 */


export const getProductById = asynchandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.status(200).json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

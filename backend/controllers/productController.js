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

/**
 * @desc Create a product
 * @route POST /api/products/
 * @access Private/Admin
 * @returns {object} - product
 *
 */

export const createProduct = asynchandler(async (req, res) => {
  const product = new Product({
    name: "Sample Name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample Brand",
    category: "Sample Category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample Description",
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

/**
 * @desc Update a product
 * @route PUT /api/products/:id
 * @access Private/Admin
 * @returns {object} - product
 *
 */

export const updateProduct = asynchandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
  }
  const updatedProduct = await product.save();
  res.status(201).json(updatedProduct);
});

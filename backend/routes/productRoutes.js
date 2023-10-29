import express from "express";
const router = express.Router();
import Product from "../models/productModel.js";
import { getProducts, getSingleProduct } from "../controllers/productController.js";

router.route("/").get(getProducts);
router.route("/:id").get(getSingleProduct)
export default router;

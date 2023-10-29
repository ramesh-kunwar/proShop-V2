import mongoose from "mongoose";
import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";

import connectDB from "./db/db.js";
import Order from "./models/orderMode.js";

dotenv.config();


connectDB();

const importData = async () => {
  try {
    // Clear out all existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // Insert all users
    const createdUsers = await User.insertMany(users);

    // Get admin user
    const adminUser = createdUsers[0]._id;

    // Insert all products
    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });
    await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // 1 indicates failure
  }
};

const destroyData = async () => {
  try {
    // Clear out all existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1); // 1 indicates failure
  }
};

// Run the seeder script with the following commands:
// To import data:
// npm run data:import
// To destroy data:
// npm run data:destroy
if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}

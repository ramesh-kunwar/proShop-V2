import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

import HomeScreen from "./screen/HomeScreen.jsx";
import "./index.css";
import ProductScreen from "./screen/ProductScreen.jsx";
import { Provider } from "react-redux";
import store from "../store.js";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import CartScreen from "./screen/CartScreen.jsx";
import LoginScreen from "./screen/LoginScreen.jsx";
import RegisterScreen from "./screen/RegisterScreen.jsx";
import ShippingScreen from "./screen/ShippingScreen.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";
import PaymentScreen from "./components/PaymentScreen.jsx";
import PlaceOrderScreen from "./screen/PlaceOrderScreen.jsx";
import OrderScreen from "./screen/OrderScreen.jsx";
import AdminRoute from "./components/AdminRoute.jsx";
import OrderListScreen from "./screen/Admin/OrderListScreen.jsx";
import ProductListScreen from "./screen/Admin/ProductListScreen.jsx";
import ProductEditScreen from "./screen/Admin/ProductEditScreen.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/product/:id" element={<ProductScreen />} />
      <Route path="/cart" element={<CartScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/shipping" element={<ShippingScreen />} />
        <Route path="/payment" element={<PaymentScreen />} />
        <Route path="/placeorder" element={<PlaceOrderScreen />} />
        <Route path="/order/:id" element={<OrderScreen />} />
      </Route>

      <Route path="" element={<AdminRoute />}>
        <Route path="/admin/orderlist" element={<OrderListScreen />} />
        <Route path="/admin/productlist" element={<ProductListScreen />} />
        <Route path="/admin/product/:id/edit" element={<ProductEditScreen />} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider deferLoading={true}>
        <RouterProvider router={router}>
          <App />
        </RouterProvider>
      </PayPalScriptProvider>
    </Provider>
  </React.StrictMode>
);

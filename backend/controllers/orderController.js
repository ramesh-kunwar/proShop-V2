import asynchandler from "../middleware/asyncHandler.js";
import Order from "../models/orderMode.js";

/***************************************
 * @desc Create new Order
 * @route POST /api/orders
 * @access Private
 * @returns {object} - Orders
 *
 ***************************************/

export const addOrderItems = asynchandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    res.status(400);
    throw new Error("No order items");
  }

  const order = new Order({
    user: req.user._id,
    orderItems: orderItems.map((x) => ({
      ...x,
      product: x._id,
      _id: undefined,
    })),
    shippingAddress,
    paymentMethod,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
  });

  const createdOrder = await order.save();

  res.status(201).json(createdOrder);
});

/***************************************
 * @desc Get logged in user orders
 * @route GET /api/myorders
 * @access Private
 * @returns {object} - Order
 *
 ***************************************/

export const getMyOrders = asynchandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
});

/***************************************
 * @desc Get order by id
 * @route GET /api/orders/:id
 * @access Private
 * @returns {object} - Order
 *
 ***************************************/

export const getOrderById = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  res.status(200).json(order);
});

/***************************************
 * @desc Update order to paid
 * @route PUT /api/orders/:id/pay
 * @access Private
 * @returns {object} - Order
 * ***************************************/

export const updateOrderToPaid = asynchandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.isPaid = true;
  order.paidAt = Date.now();
  // From paypal
  order.paymentResult = {
    id: req.body.id,
    status: req.body.status,
    update_time: req.body.update_time,
    email_address: req.body.payer.email_address,
  };

  const updatedOrder = await order.save();

  res.status(200).json(updatedOrder);
});

/***************************************
 * @desc Update to delivered
 * @route GET /api/orders/:id/deliver
 * @access Private/Admin
 * @returns {object} - Order
 * ***************************************/

export const updateOrderToDelivered = asynchandler(async (req, res) => {
  res.send("Update order to delivered");
});

/***************************************
 * @desc Get all orders
 * @route GET /api/orders
 * @access Private/Admin
 * @returns {object} - Order
 * ***************************************/

export const getOrders = asynchandler(async (req, res) => {
  res.send("Get all orders  ");
});

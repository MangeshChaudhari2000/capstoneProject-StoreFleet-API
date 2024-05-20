// Please don't change the pre-written code
// Import the necessary modules here

import {
  createNewOrderRepo,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
  getUserOrders,
} from "../model/order.repository.js";
import { ErrorHandler } from "../../../utils/errorHandler.js";

export const createNewOrder = async (req, res, next) => {
  // Write your code here for placing a new order
  try {
    const userId = req.user._id;
    console.log("this is req.user._id", req.user._id);
    const data = req.body;
    const orderdetails = await createNewOrderRepo(data, userId);

    res.status(201).send(orderdetails);
  } catch (err) {
    return next(new ErrorHandler(500, err.message || "Internal Server Error"));
  }
};

// Get the order based on orderId
export const getOrder = async (req, res, next) => {
  const id = req.query.id;
  try {
    const order = await getSingleOrder(id);
    if (order) {
      return res.status(200).json({ OrderDetails: order });
    }
  } catch (error) {
    return next(
      new ErrorHandler(
        404,
        "failed to retrieve the order for the given order id"
      )
    );
  }
};

// Get all orders
export const getEveryOrder = async (req, res, next) => {
  try {
    const order = await getAllOrders();
    if (order) {
      return res.status(200).json({ OrderDetails: order });
    }
  } catch (error) {
    return next(
      new ErrorHandler(
        404,
        "failed to retrieve the order for the given order id"
      )
    );
  }
};

// Get all orders placed by a user
export const getUserOrderDetails = async (req, res, next) => {
  const userId = req.user._doc._id;
  try {
    const order = await getUserOrders(userId);
    if (order) {
      return res.status(200).json({ OrderDetails: order });
    }
  } catch (error) {
    return next(new ErrorHandler(404, "Error in fetching details"));
  }
};

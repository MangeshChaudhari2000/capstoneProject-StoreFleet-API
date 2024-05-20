import { ObjectId } from "mongodb";
import OrderModel from "./order.schema.js";
import UserModel from "../../user/models/user.schema.js";

// Create new Order
export const createNewOrderRepo = async (data,userId) => {
  // Write your code here for placing a new order
  try {
    let {
      shippingInfo,
      orderedItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt,
      orderStatus,
    } = data;
    paidAt=new Date();
    console.log("this is userId",userId)
    const order = new OrderModel({
      shippingInfo,
      orderedItems,
      user: userId,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt,
      orderStatus,
      deliveredAt: null, 
    });

    const savedOrder = await order.save();

    return savedOrder;
  } catch (error) {
    throw error;
  }
};

// Get single order details based on the orderId
export const getSingleOrder=async (_id)=>{
  return await OrderModel.findById({_id:new ObjectId(_id)});
};

// Get all orders placed
export const getAllOrders=async()=>{
  return await OrderModel.find();
};

// Update the order status
export const updateOrderStatus=async(_id,orderStatus)=>{
  try {
    const order=await OrderModel.findById({_id:new ObjectId(_id)});
    if(order){
      const updatedOrder=await OrderModel.updateOne({orderStatus:orderStatus}).save();
      return updatedOrder;
    }
  } catch (error) {
    throw error;
  }  
};


export const getUserOrders=async(_id)=>{
  try {
    const order=await OrderModel.findById({_id:new ObjectId(_id)});
    if(order){
      
      return order;
    }
  } catch (error) {
    throw error;
  }  
};
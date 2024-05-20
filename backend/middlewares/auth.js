import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/errorHandler.js";
import UserModel from "../src/user/models/user.schema.js";

export const auth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler(401, "login to access this route!"));
  }
  const decodedData = await jwt.verify(token, process.env.JWT_Secret);
  req.user = await UserModel.findById(decodedData.id);
  next();
};

export const authByUserRole = (roles) =>async(req,res,next)=> {
  // fix this middleware for admin access only
  try {
    if (req.user.role == "user") {
      console.log("not admin");
      return next(
        new ErrorHandler(
          403,
          `Role: ${req.user.role} is not allowed to access this resource`
        )
      );
    
  };
  } catch (error) {
    console.log(error.message);
  }
    
  next();
};

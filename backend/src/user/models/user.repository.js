import UserModel from "./user.schema.js";
import mongoose from "mongoose";
import { ObjectId } from "mongoose";
import bcrypt from "bcrypt";

export const createNewUserRepo = async (user) => {
  return await new UserModel(user).save();
};

export const findUserRepo = async (factor, withPassword = false) => {
  if (withPassword) return await UserModel.findOne(factor).select("+password");
  else return await UserModel.findOne(factor);
};

export const findUserForPasswordResetRepo = async (hashtoken) => {
  return await UserModel.findOne({
    resetPasswordToken: hashtoken,
    resetPasswordExpire: { $gt: Date.now() },
  });
};

export const updateUserProfileRepo = async (_id, data) => {
  return await UserModel.findOneAndUpdate(_id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
};

export const getAllUsersRepo = async () => {
  return UserModel.find({});
};

export const deleteUserRepo = async (_id) => {
  return await UserModel.findByIdAndDelete(_id);
};

export const updateUserRoleAndProfileRepo = async (_id, data) => {
  // Write your code here for updating the roles of other users by admin
  const userDetails = await UserModel.findOne({ _id });
  const { name, email, role } = data;
  if (name) {
    userDetails.name = name;
  }
  if (email) {
    userDetails.email = email;
  } if (role) {
    userDetails.role = role;
  }

return await userDetails.save();

};

export const findUserByMailId = async (emailId) => {
  return await UserModel.findOne({ email: emailId })
}

export const resetPassordRepo = async (email, oldPassword, newPassword) => {
  const userDetails = await UserModel.findOne({ email: email });
  const newHapshPassword = await bcrypt.hash(newPassword, 12);
  userDetails.password = newPassword;
  return await userDetails.save();
}

export const attachToken = async (email) => {
  const userDetails = await UserModel.findOne({ email: email });
  if (!userDetails) {
    throw new Error('User not found');
  }
  const token = await userDetails.getResetPasswordToken();
  const isSaved = await userDetails.save();
  return userDetails.resetPasswordToken;
}


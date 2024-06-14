import express from "express";
import { createNewOrder,getOrder,getUserOrderDetails } from "../controllers/order.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = express.Router();

router.route("/new").post(auth, createNewOrder);
router.route("/").get(getOrder);
router.route("/my/orders").get(auth,getUserOrderDetails);

export default router;

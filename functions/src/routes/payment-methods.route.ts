import { Router } from "express";
import { celebrate, Segments } from "celebrate";
import asyncHandler from "express-async-handler";
import { PaymentMethodControler } from "../controllers/payment-method.controller.js";
import { newPaymentMethodSchema, upadatePaymentMethodSchema } from "../models/payment.method.model.js";

export const paymentMethodRoutes = Router();

paymentMethodRoutes.get("/payment-methods", asyncHandler(PaymentMethodControler.getAll));
paymentMethodRoutes.get("/payment-methods/:id", asyncHandler(PaymentMethodControler.getById));
paymentMethodRoutes.post("/payment-methods", celebrate({ [Segments.BODY]: newPaymentMethodSchema }), asyncHandler(PaymentMethodControler.save));
paymentMethodRoutes.put("/payment-methods/:id", celebrate({ [Segments.BODY]: upadatePaymentMethodSchema }), asyncHandler(PaymentMethodControler.update));
paymentMethodRoutes.delete("/payment-methods/:id", asyncHandler(PaymentMethodControler.delete));

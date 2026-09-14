import express from "express";
import asyncHandler from "express-async-handler";
import { UsersController } from "../controllers/users.controller";
import { celebrate, Segments } from "celebrate";
import { userSchema } from "../models/use.model";

export const userRoutes = express.Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll)); //asyncHandler assim no meus controllers nao preciso tratar o erros com try/catch
userRoutes.get("/users/:id", asyncHandler(UsersController.getById));
userRoutes.post("/users", celebrate({ [Segments.BODY]: userSchema }), asyncHandler(UsersController.save));
userRoutes.put("/users/:id", celebrate({ [Segments.BODY]: userSchema }), asyncHandler(UsersController.update));
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete));

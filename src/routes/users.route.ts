import { Router } from "express";
import asyncHandler from "express-async-handler";
import { UsersController } from "../controllers/users.controller";
import { celebrate, Segments } from "celebrate";
import { newUserSchema, updateUserSchema } from "../models/use.model";

export const userRoutes = Router();

userRoutes.get("/users", asyncHandler(UsersController.getAll)); //asyncHandler assim no meus controllers nao preciso tratar o erros com try/catch
userRoutes.get("/users/:id", asyncHandler(UsersController.getById));
userRoutes.post("/users", celebrate({ [Segments.BODY]: newUserSchema }), asyncHandler(UsersController.save));
userRoutes.put("/users/:id", celebrate({ [Segments.BODY]: updateUserSchema }), asyncHandler(UsersController.update));
userRoutes.delete("/users/:id", asyncHandler(UsersController.delete));

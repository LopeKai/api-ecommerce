import { Router } from "express";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { CompaniesController } from "../controllers/companies.controller";
import { companySchema } from "../models/company.model";

export const companyRoutes = Router();

companyRoutes.get("/companies", asyncHandler(CompaniesController.getAll)); //asyncHandler assim no meus controllers nao preciso tratar o erros com try/catch
companyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById));
companyRoutes.post("/companies", celebrate({ [Segments.BODY]: companySchema }), asyncHandler(CompaniesController.save));
companyRoutes.put("/companies/:id", celebrate({ [Segments.BODY]: companySchema }), asyncHandler(CompaniesController.update));

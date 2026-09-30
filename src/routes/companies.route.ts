import { Router } from "express";
import asyncHandler from "express-async-handler";
import { celebrate, Segments } from "celebrate";
import { CompaniesController } from "../controllers/companies.controller.js";
import { newCompanySchema, updateCompanySchema } from "../models/company.model.js";

export const companyRoutes = Router();

companyRoutes.get("/companies", asyncHandler(CompaniesController.getAll)); //asyncHandler assim no meus controllers nao preciso tratar o erros com try/catch
companyRoutes.get("/companies/:id", asyncHandler(CompaniesController.getById));
companyRoutes.post("/companies", celebrate({ [Segments.BODY]: newCompanySchema }), asyncHandler(CompaniesController.save));
companyRoutes.put("/companies/:id", celebrate({ [Segments.BODY]: updateCompanySchema }), asyncHandler(CompaniesController.update));

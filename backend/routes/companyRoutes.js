import express from "express";
import { getCompanies,
         addCompanies,
         deleteCompanies,
         updateCompanies
        } from "../controllers/companyController.js";

const router = express.Router();

router.get("/", getCompanies);
router.post("/", addCompanies);
router.delete("/:id", deleteCompanies);
router.put("/:id", updateCompanies);

export default router;

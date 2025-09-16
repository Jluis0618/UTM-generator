import express from "express";
import { generateCustomUTM, generateDefaultUTM } from "../controllers/utmController.js";

const router = express.Router();

router.post("/generate-default", generateDefaultUTM);
router.post("/generate-customUTM", generateCustomUTM);

export default router;
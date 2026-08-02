import express from "express";

import { optimizeBudget } from "../controllers/optimizeController.js";

import authenticateUser from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, optimizeBudget);

export default router;
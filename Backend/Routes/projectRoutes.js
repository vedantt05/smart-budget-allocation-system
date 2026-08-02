import express from "express";

import {

    createProject,

    getProjects,

    getProject,

    updateProject,

    deleteProject

} from "../Controllers/projectController.js";

const router = express.Router();

/* ==========================================
   PROJECT ROUTES
========================================== */

// Create Project
router.post(

    "/",

    createProject

);

// Get All Projects
router.get(

    "/",

    getProjects

);

// Get Single Project
router.get(

    "/:id",

    getProject

);

// Update Project
router.put(

    "/:id",

    updateProject

);

// Delete Project
router.delete(

    "/:id",

    deleteProject

);

export default router;
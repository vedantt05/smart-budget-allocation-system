import errorHandler from "./middleware/errorMiddleware.js";
import optimizeRoutes from "./Routes/optimizeRoutes.js";
import projectRoutes from "./Routes/projectRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDatabase from "./Config/db.js";

dotenv.config();
connectDatabase();

const app = express();

/* ==========================================
   MIDDLEWARE
========================================== */

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

/* ==========================================
   HOME ROUTE
========================================== */

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "Smart Budget Allocation System Backend Running 🚀",

        version: "1.0.0"

    });

});

/* ==========================================
   HEALTH CHECK
========================================== */

app.get("/api/health", (req, res) => {

    res.status(200).json({

        status: "OK",

        uptime: process.uptime(),

        timestamp: new Date(),

        environment: process.env.NODE_ENV || "development"

    });

});

/* ==========================================
   PLACEHOLDER ROUTES
========================================== */

app.use(

    "/api/auth",

    authRoutes

);

app.use(

"/api/projects",

projectRoutes

);

app.use(

    "/api/optimize",

    optimizeRoutes

);

/* ==========================================
   404 HANDLER
========================================== */

app.use((req, res) => {

    res.status(404).json({

        success: false,

        message: "Route Not Found"

    });

});

/* ==========================================
   SERVER
========================================== */

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log("");

    console.log("====================================");

    console.log(" SMART BUDGET BACKEND STARTED ");

    console.log("====================================");

    console.log(` Server : http://localhost:${PORT}`);

    console.log(` Environment : ${process.env.NODE_ENV || "development"}`);

    console.log("====================================");

});
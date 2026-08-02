import Project from "../Models/project.js";

/* ==========================================
   CREATE PROJECT
========================================== */

export const createProject = async (req, res) => {

    try {

        const {

            projectName,

            budget,

            items,

            selectedItems,

            totalCost,

            totalBenefit,

            remainingBudget,

            algorithm,

            user

        } = req.body;

        const project = await Project.create({

            user,

            projectName,

            budget,

            items,

            selectedItems,

            totalCost,

            totalBenefit,

            remainingBudget,

            algorithm

        });

        res.status(201).json({

            success: true,

            message: "Project Saved Successfully",

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
/* ==========================================
   GET ALL PROJECTS
========================================== */

export const getProjects = async (req, res) => {

    try {

        const { user } = req.query;

        const projects = await Project.find({

            user

        }).sort({

            createdAt: -1

        });

        res.status(200).json({

            success: true,

            count: projects.length,

            projects

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
/* ==========================================
   GET SINGLE PROJECT
========================================== */

export const getProject = async (req, res) => {

    try {

        const project = await Project.findById(

            req.params.id

        );

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project Not Found"

            });

        }

        res.status(200).json({

            success: true,

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
/* ==========================================
   UPDATE PROJECT
========================================== */

export const updateProject = async (req, res) => {

    try {

        const project = await Project.findByIdAndUpdate(

            req.params.id,

            req.body,

            {

                new: true,

                runValidators: true

            }

        );

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project Not Found"

            });

        }

        res.status(200).json({

            success: true,

            message: "Project Updated Successfully",

            project

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
/* ==========================================
   DELETE PROJECT
========================================== */

export const deleteProject = async (req, res) => {

    try {

        const project = await Project.findById(

            req.params.id

        );

        if (!project) {

            return res.status(404).json({

                success: false,

                message: "Project Not Found"

            });

        }

        await project.deleteOne();

        res.status(200).json({

            success: true,

            message: "Project Deleted Successfully"

        });

    }

    catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};
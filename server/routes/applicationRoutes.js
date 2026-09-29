const express = require("express");
const Application = require("../models/Application");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// Add a new job application
router.post("/", authMiddleware, async (req, res) => {
    try {
        const {
            company,
            role,
            location,
            applicationDate,
            jobUrl,
            status,
            notes
        } = req.body;

        const application = await Application.create({
            user: req.user.userId,
            company,
            role,
            location,
            applicationDate: applicationDate || undefined,
            jobUrl,
            status,
            notes
        });

        res.status(201).json({
            message: "Application added successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add application",
            error: error.message
        });
    }
});


// Get all applications
// Get applications with search and filters
router.get("/", authMiddleware, async (req, res) => {
    try {
        const { search, status, location } = req.query;

        const filter = {
            user: req.user.userId
        };

        // Search by company or role
        if (search) {
            filter.$or = [
                { company: { $regex: search, $options: "i" } },
                { role: { $regex: search, $options: "i" } }
            ];
        }

        // Filter by status
        if (status) {
            filter.status = status;
        }

        // Filter by location
        if (location) {
            filter.location = {
                $regex: location,
                $options: "i"
            };
        }

        const applications = await Application.find(filter)
            .sort({ createdAt: -1 });


        res.json({
            applications
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch applications",
            error: error.message
        });
    }
});


// Update an application
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        const {
            company,
            role,
            location,
            applicationDate,
            jobUrl,
            status,
            notes
        } = req.body;

        application.company =
            company ?? application.company;

        application.role =
            role ?? application.role;

        application.location =
            location ?? application.location;

        application.applicationDate =
            applicationDate ?? application.applicationDate;

        application.jobUrl =
            jobUrl ?? application.jobUrl;

        application.status =
            status ?? application.status;

        application.notes =
            notes ?? application.notes;

        await application.save();

        res.json({
            message: "Application updated successfully",
            application
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update application",
            error: error.message
        });
    }
});


// Delete an application
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const application = await Application.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }

        await application.deleteOne();

        res.json({
            message: "Application deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to delete application",
            error: error.message
        });
    }
});


module.exports = router;
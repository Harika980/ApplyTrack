const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        company: {
            type: String,
            required: true
        },

        role: {
            type: String,
            required: true
        },

        location: {
            type: String
        },

        applicationDate: {
            type: Date,
            default: Date.now
        },

        jobUrl: {
            type: String
        },

        status: {
            type: String,
            enum: [
                "Applied",
                "Assessment",
                "Interview",
                "Selected",
                "Rejected"
            ],
            default: "Applied"
        },

        notes: {
            type: String
        }
    },

    {
        timestamps: true
    }
);

const Application = mongoose.model(
    "Application",
    applicationSchema
);

module.exports = Application;
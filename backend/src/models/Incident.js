const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({

    serviceName: String,

    description: String,

    severity: String,

    status: {
        type: String,
        default: "OPEN"
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    resolvedAt: Date

});

module.exports = mongoose.model(
    "Incident",
    incidentSchema
);
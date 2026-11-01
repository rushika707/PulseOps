const express = require("express");
const path = require("path");

const { monitorAll } = require("./src/services/monitor");

const app = express();

const PORT = 3000;

app.use(express.static(path.join(__dirname, "public")));

let serviceStatus = [];
let incidents = [];

async function updateMonitoring() {

    const results = await monitorAll();

    for (const service of results) {

        const previous = serviceStatus.find(
            s => s.name === service.name
        );

        const oldStatus = previous?.status;

        // Detect failure or degradation
        if (
            service.status !== "HEALTHY" &&
            service.status !== oldStatus
        ) {

            const existing = incidents.find(
                i => i.serviceName === service.name &&
                     i.status === "OPEN"
            );

            if (!existing) {

                incidents.unshift({

                    serviceName: service.name,

                    description:
                        service.status === "DOWN"
                        ? "Service is unavailable"
                        : "High response time detected",

                    severity:
                        service.status === "DOWN"
                        ? "CRITICAL"
                        : "WARNING",

                    status: "OPEN",

                    createdAt: new Date()

                });

            }

        }

        // Detect recovery
        if (
            service.status === "HEALTHY" &&
            oldStatus &&
            oldStatus !== "HEALTHY"
        ) {

            incidents.forEach(incident => {

                if (
                    incident.serviceName === service.name &&
                    incident.status === "OPEN"
                ) {

                    incident.status = "RESOLVED";
                    incident.resolvedAt = new Date();

                }

            });

        }

    }

    serviceStatus = results;

}

app.get("/api/status", (req, res) => {

    res.json(serviceStatus);

});

app.get("/api/incidents", (req, res) => {

    res.json(incidents);

});

app.get("/health", (req, res) => {

    res.json({ status: "Backend running" });

});

async function startServer() {

    await updateMonitoring();

    setInterval(updateMonitoring, 5000);

    app.listen(PORT, () => {

        console.log(
            `PulseOps Dashboard running at http://localhost:${PORT}`
        );

    });

}

startServer();
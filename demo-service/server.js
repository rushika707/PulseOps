const express = require("express");

const app = express();

const PORT = 4000;

const SERVICE_NAME =
    process.env.SERVICE_NAME || "Demo Service";

const DELAY =
    Number(process.env.DELAY_MS || 100);

app.get("/health", async (req, res) => {

    await new Promise(resolve =>
        setTimeout(resolve, DELAY)
    );

    res.json({
        service: SERVICE_NAME,
        status: "HEALTHY",
        timestamp: new Date()
    });

});

app.listen(PORT, () => {

    console.log(
        `${SERVICE_NAME} running on port ${PORT}`
    );

});

const classifyHealth = require("./health");

const services = [
    {
        name: "User Service",
        url: process.env.USER_SERVICE_URL ||
            "http://localhost:4000/health"
    },
    {
        name: "Payment Service",
        url: process.env.PAYMENT_SERVICE_URL ||
            "http://localhost:4001/health"
    }
];

async function checkService(service) {
    const startTime = Date.now();

    try {
        const response = await fetch(service.url, {
            signal: AbortSignal.timeout(2000)
        });

        const responseTime = Date.now() - startTime;

        return {
            name: service.name,
            status: classifyHealth(response.ok, responseTime),
            responseTime,
            lastChecked: new Date()
        };
    } catch (error) {
        console.error(`Health check failed for ${service.name}:`, error.message);

        return {
            name: service.name,
            status: "DOWN",
            responseTime: null,
            lastChecked: new Date()
        };
    }
}

async function monitorAll() {
    return Promise.all(services.map(checkService));
}

module.exports = { monitorAll };

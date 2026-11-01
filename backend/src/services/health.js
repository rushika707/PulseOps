function classifyHealth(available, responseTime) {

    if (!available) {
        return "DOWN";
    }

    if (responseTime > 500) {
        return "DEGRADED";
    }

    return "HEALTHY";
}

module.exports = classifyHealth;
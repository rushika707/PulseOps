async function updateDashboard() {

    try {

        // Get service information
        const serviceResponse =
            await fetch("/api/status");

        const services = await serviceResponse.json();

        // Get incident information
        const incidentResponse =
            await fetch("/api/incidents");

        const incidents = await incidentResponse.json();

        // Calculate service counts
        const healthy = services.filter(
            s => s.status === "HEALTHY"
        ).length;

        const degraded = services.filter(
            s => s.status === "DEGRADED"
        ).length;

        const down = services.filter(
            s => s.status === "DOWN"
        ).length;

        // Update dashboard cards
        document.getElementById("total").textContent =
            services.length;

        document.getElementById("healthy").textContent =
            healthy;

        document.getElementById("degraded").textContent =
            degraded;

        document.getElementById("down").textContent =
            down;

        // Display service information
        const serviceTable =
            document.getElementById("serviceTable");

        serviceTable.replaceChildren();

        services.forEach(service => {

            const row = document.createElement("tr");

            const values = [
                service.name,
                service.status,
                service.responseTime === null
                    ? "N/A"
                    : service.responseTime + " ms",
                new Date(service.lastChecked)
                    .toLocaleTimeString()
            ];

            values.forEach((value, index) => {

                const cell = document.createElement("td");

                cell.textContent = value;

                if (index === 1) {
                    cell.className =
                        service.status.toLowerCase();
                }

                row.appendChild(cell);

            });

            serviceTable.appendChild(row);

        });

        // Display incidents
        const incidentTable =
            document.getElementById("incidentTable");

        incidentTable.replaceChildren();

        incidents.forEach(incident => {

            const row = document.createElement("tr");

            const values = [
                incident.serviceName,
                incident.description,
                incident.severity,
                incident.status
            ];

            values.forEach(value => {

                const cell = document.createElement("td");

                cell.textContent = value;

                row.appendChild(cell);

            });

            incidentTable.appendChild(row);

        });

    } catch (error) {

        console.error("Dashboard error:", error);

    }

}

// Initial update
updateDashboard();

// Refresh every 3 seconds
setInterval(updateDashboard, 3000);
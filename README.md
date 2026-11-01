# PulseOps – Basic DevOps Monitoring Platform

A simple service monitoring and containerization project built using Node.js, Docker, Docker Compose, and GitHub Actions.

## 1. Project Overview

PulseOps is a basic DevOps project designed to monitor the health and availability of application services.

It provides a web-based dashboard that displays service health, response times, and incidents. It detects service failures and identifies when services recover.

The application is containerized using Docker and deployed locally using Docker Compose. GitHub Actions is used to automate testing whenever code is pushed to the repository.

## 2. Objectives

- Understand the fundamentals of DevOps.
- Containerize applications using Docker.
- Run multiple services using Docker Compose.
- Monitor application health and availability.
- Detect service failures and recovery.
- Implement automated testing using GitHub Actions.
- Manage source code using Git and GitHub.

## 3. Technologies Used

| Technology | Purpose |
|---|---|
| JavaScript | Application programming |
| Node.js | Backend runtime |
| Express.js | Backend framework |
| HTML | Dashboard structure |
| CSS | Dashboard styling |
| Docker | Application containerization |
| Docker Compose | Multi-container management |
| Git | Version control |
| GitHub | Source code hosting |
| GitHub Actions | Continuous Integration |
| Node.js Test Runner | Automated testing |

## 4. System Architecture

The PulseOps platform consists of a backend, a monitoring dashboard, and two demo application services.

**Architecture Flow:**

GitHub Repository  
↓  
GitHub Actions – Automated Testing  
↓  
Docker Compose  
↓  
PulseOps Backend  
↓  
Health Monitoring  
↓  
User Service and Payment Service  
↓  
Monitoring Dashboard

## 5. Features

### Service Health Monitoring
- Monitors multiple application services.
- Checks service availability through health endpoints.
- Measures service response time.
- Classifies services as HEALTHY, DEGRADED, or DOWN.

### Incident Management
- Detects service failures.
- Creates incidents when a service becomes unavailable.
- Tracks incident severity and status.
- Marks incidents as RESOLVED when services recover.

### Dashboard
- Displays total monitored services.
- Shows healthy, degraded, and down service counts.
- Displays service information.
- Shows detected incidents.

### Docker Containerization
- Uses Dockerfiles to build application images.
- Runs services in isolated containers.
- Uses Docker Compose to manage multiple containers.

### Continuous Integration
- Uses GitHub Actions.
- Automatically installs backend dependencies.
- Executes automated tests whenever code is pushed to the main branch or a pull request targets main.

## 6. Project Structure

```text
PulseOps/
│
├── .github/
│   └── workflows/
│       └── ci.yml
│
├── backend/
│   ├── public/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   │
│   ├── src/
│   │   └── services/
│   │       ├── health.js
│   │       ├── health.test.js
│   │       └── monitor.js
│   │
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── demo-service/
│   ├── Dockerfile
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── .gitignore
├── docker-compose.yaml
└── README.md
```

## 7. Installation and Execution

### Prerequisites

Install the following:

- Node.js
- Git
- Docker Desktop

### Step 1: Clone the repository

```bash
git clone https://github.com/rushika707/PulseOps.git
```

### Step 2: Navigate to the project directory

```bash
cd PulseOps
```

### Step 3: Build and start containers

```bash
docker compose -f docker-compose.yaml up --build -d
```

### Step 4: Check running containers

```bash
docker compose -f docker-compose.yaml ps
```

### Step 5: Open the dashboard

Visit:

http://localhost:3000

## 8. API Endpoints

| Endpoint | Description |
|---|---|
| `/` | Monitoring dashboard |
| `/health` | Backend health check |
| `/api/status` | Current service status |
| `/api/incidents` | Incident information |

## 9. Testing

PulseOps uses the built-in Node.js test runner.

Run the tests locally:

```bash
cd backend
npm test
```

The health classification logic is tested using three test cases:

1. Healthy service.
2. Slow service.
3. Unavailable service.

## 10. Docker Failure and Recovery Demonstration

One of the main features of PulseOps is detecting service failures.

### Simulate service failure

```bash
docker stop payment-service
```

The monitoring system detects the unavailable service and creates an incident.

### Restore the service

```bash
docker start payment-service
```

The monitoring system detects recovery and marks the incident as RESOLVED.

## 11. GitHub Actions – Continuous Integration

PulseOps uses GitHub Actions to automate backend testing.

The CI workflow performs the following steps:

1. Checks out the repository.
2. Sets up Node.js.
3. Installs backend dependencies.
4. Executes automated tests.

The workflow runs automatically on pushes and pull requests targeting the main branch.

**Workflow file:** `.github/workflows/ci.yml`

View the workflow results:

https://github.com/rushika707/PulseOps/actions

## 12. Limitations

- Designed for local demonstration and learning.
- Incident information is stored in application memory and is not persistent across backend restarts.
- Monitoring is limited to the configured demo services.
- The project does not currently include cloud deployment or advanced infrastructure monitoring.

## 13. Future Enhancements

- Add persistent incident storage.
- Introduce advanced monitoring tools.
- Deploy the application to a cloud platform.
- Extend monitoring to additional application services.

## 14. Conclusion

PulseOps demonstrates basic DevOps concepts through application containerization, multi-container orchestration, service health monitoring, automated testing, and continuous integration.

The project provides practical experience with Docker, Docker Compose, Git, GitHub, and GitHub Actions.

---

**GitHub Repository:** https://github.com/rushika707/PulseOps
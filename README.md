# MiniCRM - Local Deployment Guide

This instance of the project focuses on local deplyment using **Docker Compose** to manage all services (backend, frontend, database, Kafka, and optional data ingestion).

---

## 🚀 Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- Valid Google OAuth Crendentials, Gemini API Key
- Kafka and Postgres, Refer to my [Setup Guide](https://github.com/Recker-Dev/Infra-Bootstrap)
---

## 🔑 Environment Variables

Each service must have its own `.env` file located in its folder. A `.env_dev` is provided for quick setup.



### ⚠️ Note:

 - Replace *** with your real secrets locally.

---

## 🛠️ Commands [Setup Environment Variables Before Proceeding ]

### 1. Start **all services** (with rebuild)
```bash
docker compose up -d --build
```
This will build and start all defined services:
- Role -> Service
- Backend -> `backend`
- Consumer -> `consumer`
- Vendor (simulated) -> `vendor`
- Data ingestion (faker) -> `data_injestion`
- Frontend -> `frontend`
- Database -> `db`
- Kafka -> `kafka`

### 2. Start services without data ingestion (database don't get populated without data ingestion)
```bash
docker compose up -d --build --scale data_injestion=0
```
This will bring up everything except `data_injestion`.


### 3. Start the data ingestion service only when needed
```bash
docker compose up -d --build --scale data_injestion=0
```
Because `data_injestion` depends on Kafka and Backend, Docker Compose will also start them if they are not already running.


## 📋 Notes

- Logs can be viewed with:

    ```bash
    docker compose logs -f <service_name>
    ```    


- To stop everything:

    ```bash
    docker compose down
    ```

- To stop only one service:

    ```bash
    docker compose stop <service_name>
    ```

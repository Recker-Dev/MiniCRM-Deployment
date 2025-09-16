# MiniCRM - Local Deployment Guide

This instance of the project focuses on local deplyment using **Docker Compose** to manage all services (backend, frontend, database, Kafka, and optional data ingestion).

---

## 🚀 Prerequisites
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/)
- Valid Google OAuth Crendentials, Gemini API Key
---

## 🔑 Environment Variables

Each service has its own `.env` file located in its folder. Below are the required variables.

---

### 📂 `data_injestion_faker/.env`
```env
BACKEND_URL=http://backend:3000
```

### 📂 `mini_crm_frontend/.env`
```env
PORT=5173
NEXTAUTH_URL=http://localhost:5173
NEXT_PUBLIC_BACKEND_URI=http://minicrm.reckerdev.in
NEXT_PUBLIC_AUTH_URI=http://minicrm.reckerdev.in
NEXTAUTH_SECRET=***
GOOGLE_CLIENT_SECRET=***
GOOGLE_CLIENT_ID=***
```

### 📂 `minicrm_backend/.env`
```env
DATABASE_URL="postgresql://minicrm_user:***@db:5432/minicrm?schema=public"
GEMINI_API_KEY=***
KAFKA_SERVICE_CONTAINER=kafka
```

### 📂 `minicrm_backend_consumer/.env`
```env
DATABASE_URL="postgresql://minicrm_user:***@db:5432/minicrm?schema=public"
GEMINI_API_KEY=***
KAFKA_SERVICE_CONTAINER=kafka
VENDOR_BACKEND=http://vendor:3500
```

### 📂 `vendor_faker/.env`
```env
BACKEND=http://backend:3000
```

### ⚠️ Note:

 - Replace *** with your real secrets locally.


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

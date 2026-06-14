# PortfolioPro Express & MongoDB Backend

This is the backend service for **PortfolioPro**, engineered in **Node.js, Express, and Mongoose**. It persists all portfolio details and processes visitor traffic logs.

---

## ⚡ Setup & Launch Instructions

### 1. Requirements
Ensure you have **Node.js** and a local/cloud instance of **MongoDB** running.

### 2. Installation
Navigate to the `backend` directory and install the required dependencies:
```bash
cd backend
npm install
```

### 3. Configure Environments
Create or edit your `.env` file inside the `backend` directory (default values are already pre-configured):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfoliopro
ADMIN_PASSWORD=admin
```

### 4. Boot Up the Server
Start the development server with live reload (`nodemon`):
```bash
npm run dev
```
Upon successful boot, you will see:
```text
✅ Connected to MongoDB database successfully!
🚀 Express server executing at http://localhost:5000
```
*Note: If MongoDB is offline, the backend will display a friendly warning and load safely without crashing.*

---

## 🛰️ REST API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| **POST** | `/api/auth/login` | Validates security credentials and returns session tokens. |
| **GET** | `/api/portfolio` | Retrieves all portfolio details. Auto-seeds default values if MongoDB is blank. |
| **POST** | `/api/portfolio` | Synces modified portfolio details directly to MongoDB. |
| **GET** | `/api/analytics` | Returns absolute visitor hits and 7-day logs. |
| **POST** | `/api/analytics/increment` | Daily tracking counter hits increments. |

---

## 🛡️ High-Resilience Hybrid Architecture
The portfolio app incorporates a **Stale-While-Revalidate hybrid cache fallback design**:
- **Offline / Server Offline**: If the Node/Express backend or MongoDB is offline or loading, the portfolio will serve your pages instantly (0ms delay) from the local cache and authenticate with default keys safely.
- **Online / Backend Active**: Background ticks sync the latest edits seamlessly between MongoDB and the browser window, updating information smoothly without disturbing the visitor.

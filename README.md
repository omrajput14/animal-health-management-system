<div align="center">

<img src="https://img.shields.io/badge/status-LIVE-brightgreen?style=for-the-badge" />

# 🐄 AgriTech Biosecurity System

### _"Because every animal deserves a doctor, and every farmer deserves AI."_

<br />

[![React 18](https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=white)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Google Gemini](https://img.shields.io/badge/AI-Gemini_2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB_Atlas-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/atlas)
[![PWA](https://img.shields.io/badge/PWA-Offline_Ready-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)
[![Vercel](https://img.shields.io/badge/Frontend-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com/)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?style=flat-square&logo=render&logoColor=white)](https://render.com/)

<br />

**An enterprise-grade, AI-powered Progressive Web App for livestock disease diagnostics,**  
**farm biosecurity management, and real-time outbreak containment.**

Built from scratch with a microservice architecture spanning **3 independent servers**,  
deployed live across **2 cloud platforms**, and powered by **Google's Gemini Vision AI**.

---

[Live Demo](#-live-deployment) · [Features](#-what-it-does) · [Tech Stack](#-architecture--tech-stack) · [Getting Started](#-local-development-setup)

</div>

---

## 🧬 The Problem

> In rural India, **60% of livestock diseases go undiagnosed** until it's too late.  
> Farmers lack access to veterinary experts. By the time they travel to a clinic, diseases have already spread to neighboring farms.  
> There is no centralized system to track outbreaks, issue quarantine alerts, or generate legally valid health certificates on-the-fly.

**This project solves all three.**

---

## 🎬 What It Does

### 🧠 1. AI Disease Scanner — _Powered by Google Gemini 2.5 Flash_

Upload or snap a photo of any livestock animal. The image is sent through the Node.js backend gateway to a dedicated **Python FastAPI microservice**, which forwards it to **Google's Gemini Vision AI** with a custom veterinary pathology prompt.

The AI returns:
- 🏷️ **Disease Name** (common + scientific)
- 📊 **Confidence Score** (0–100%)
- 🔴 **Severity Level** (Critical / High / Medium / Low / None)
- 📋 **Visual Symptom Analysis** — what the AI actually detected in the pixels
- 💊 **Treatment Plan** — immediate veterinary action steps
- 🐄 **Animal Category** — Cattle, Poultry, Pig, etc.

> _This isn't a toy demo with hardcoded responses — it's a real AI analyzing real images._

---

### 📄 2. Premium Veterinary PDF Reports — _Client-Side Generation_

After the AI diagnosis, the user can generate a **professional, A4-ready Veterinary Health Certificate** directly in the browser using `html2pdf.js`.

The PDF includes:
- 🏥 Official header with farm name, location & date
- 📸 The actual uploaded photograph embedded in the document
- 🧪 Full AI diagnostic results (disease name, severity, confidence)
- 💉 Treatment recommendations
- 👨‍⚕️ Farmer/owner credentials
- 🔖 Unique report ID for traceability

> _No server round-trip needed. The entire PDF is rendered on the client and downloaded instantly — even works offline once cached._

---

### 🗺️ 3. Live GIS Disease Tracking Map — _Leaflet.js Geofencing_

An interactive geographic map built with `react-leaflet` that visualizes:
- 📍 **Your farm's location** with a custom marker
- 🏥 **Nearby veterinary clinics** with contact info popups
- 🐄 **Neighboring farms** within a configurable radius
- 🔴 **Quarantine Zones** — a visual 4km containment radius overlay

The **Outbreak Simulation Engine** lets you:
1. Trigger a simulated disease outbreak
2. Watch a red quarantine circle expand around the infected farm
3. See which neighboring farms fall within the danger zone
4. Auto-generate dispatch notifications to affected farmers

> _This feature alone demonstrates geospatial thinking, real-time data visualization, and crisis management UX._

---

### 📊 4. Real-Time Analytics Dashboard — _Recharts Data Visualization_

A beautiful, data-rich dashboard built with `Recharts` featuring:
- 📈 **Line Charts** — Disease trend analysis over time
- 📊 **Bar Charts** — Scan results by animal category
- 🍩 **Pie Charts** — Biosecurity compliance breakdown
- 📋 **Live Stats Cards** — Total scans, active alerts, compliance score
- 🎯 **Risk Assessment Score** — Calculated from a multi-step questionnaire

> _Every chart animates on load with smooth easing transitions._

---

### 🛡️ 5. Biosecurity Compliance Engine

A comprehensive compliance tracking system with:
- ✅ **Checklist-based auditing** across multiple biosecurity categories
- 📊 **Weighted scoring algorithm** that calculates an overall compliance percentage
- 📅 **Historical tracking** — see how compliance improves over time
- ⚠️ **Risk flagging** — automatically highlights areas below threshold

---

### 📝 6. Interactive Risk Assessment Questionnaire

A guided, multi-step assessment flow where farmers answer questions about:
- Animal housing conditions
- Feed and water sources
- Visitor and vehicle protocols
- Vaccination schedules
- Waste management practices

The system calculates a **dynamic risk score** and provides a color-coded risk level (Low / Medium / High / Critical) with specific improvement recommendations.

---

### 📱 7. Progressive Web App (PWA) — _Works Offline_

This isn't just a website. It's an **installable application** built with:

| Feature | Implementation |
|---------|---------------|
| **Service Worker** | Custom `Workbox` configuration with runtime caching strategies |
| **Offline Detection** | Real-time online/offline event listeners on every page |
| **Smart UI Degradation** | Internet-dependent features (AI Scanner, data sync) show graceful warnings when offline; cached pages remain fully interactive |
| **App Manifest** | Full `manifest.json` with icons, splash screens, theme colors |
| **Install Prompt** | Users can "Add to Home Screen" on mobile and desktop |

> _Designed for rural India where internet connectivity drops frequently. The farmer can still browse their dashboard, view cached reports, and access the compliance checklist — even without signal._

---

### 🌐 8. Multilingual Support — _i18next_

Full internationalization across **3 languages**:
- 🇬🇧 English
- 🇮🇳 Hindi (हिन्दी)
- 🇮🇳 Telugu (తెలుగు)

Language switching is instant and persists across sessions.

---

### 🔐 9. Authentication & Security

- **JWT-based authentication** with protected API routes
- **bcrypt password hashing** — passwords are never stored in plaintext
- **Role-based access control** — different views for farmers, vets, and admins
- **CORS-configured** backend with environment-specific origin policies
- **Middleware-protected** routes on both frontend (React Router guards) and backend (Express middleware)

---

## 🏗️ Architecture & Tech Stack

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND                             │
│              React 18 + Redux Toolkit + PWA                 │
│                   Deployed on Vercel                        │
│                                                             │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │Dashboard │ │AI Scanner│ │ GIS Map  │ │ Compliance   │   │
│  │(Recharts)│ │(Camera)  │ │(Leaflet) │ │ (Checklist)  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────────┐   │
│  │PDF Report│ │  Risk    │ │  Auth    │ │   Profile    │   │
│  │(html2pdf)│ │Assessment│ │(JWT+Form)│ │  (Settings)  │   │
│  └──────────┘ └──────────┘ └──────────┘ └──────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS (REST API)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    BACKEND SERVER                            │
│             Node.js + Express + Mongoose                     │
│                  Deployed on Render                          │
│                                                             │
│  ┌────────────┐ ┌────────────┐ ┌────────────────────────┐   │
│  │ Auth API   │ │ Farm API   │ │ Scanner Proxy Gateway  │   │
│  │ (bcrypt)   │ │ (CRUD)     │ │ (Forwards to Python)   │   │
│  └────────────┘ └────────────┘ └───────────┬────────────┘   │
│  ┌────────────┐ ┌────────────┐             │               │
│  │Compliance  │ │Risk Assess │             │               │
│  │    API     │ │    API     │             │               │
│  └────────────┘ └────────────┘             │               │
└────────────────────────────────────────────┬────────────────┘
                         │                   │
          ┌──────────────┘                   │
          ▼                                  ▼
┌──────────────────┐            ┌─────────────────────────┐
│  MongoDB Atlas   │            │   AI MICROSERVICE        │
│  (Cloud DB)      │            │   Python FastAPI          │
│                  │            │   Deployed on Render      │
│  • Users         │            │                          │
│  • Farms         │            │   Google Gemini 2.5      │
│  • Assessments   │            │   Vision AI Analysis     │
│  • Compliance    │            │                          │
│  • Disease Alerts│            │   /analyze endpoint      │
└──────────────────┘            └─────────────────────────┘
```

### Frontend
| Technology | Purpose |
|-----------|---------|
| React 18 | UI Framework with Hooks |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing with protected routes |
| Recharts | Interactive data visualization |
| Leaflet / react-leaflet | GIS mapping and geofencing |
| html2pdf.js | Client-side PDF certificate generation |
| Workbox | Service worker for offline caching |
| i18next | Internationalization (EN/HI/TE) |
| Axios | HTTP client with JWT interceptors |
| Formik + Yup | Form handling with schema validation |
| Lucide React | Premium SVG icon library |
| react-hot-toast | Toast notification system |

### Backend
| Technology | Purpose |
|-----------|---------|
| Node.js + Express | RESTful API server |
| MongoDB + Mongoose | Document database with ODM |
| JSON Web Tokens | Stateless authentication |
| bcryptjs | Password hashing |
| Multer | Multipart file upload handling |
| CORS | Cross-origin resource sharing |

### AI Microservice
| Technology | Purpose |
|-----------|---------|
| Python 3.9+ | Runtime |
| FastAPI | High-performance async web framework |
| google-genai | Google Gemini API client |
| python-dotenv | Environment variable management |
| uvicorn | ASGI server |

---

## 🌍 Live Deployment

The entire system is deployed across **two cloud platforms** using a microservice architecture:

| Service | Platform | URL |
|---------|----------|-----|
| 🖥️ **Frontend** | Vercel | `animal-health-management-system.vercel.app` |
| ⚙️ **Backend API** | Render | `agritech-backend.onrender.com` |
| 🧠 **AI Service** | Render | `agritech-ml-service.onrender.com` |
| 🗃️ **Database** | MongoDB Atlas | Cloud-hosted cluster |

> **Note:** Free-tier Render services spin down after 15 minutes of inactivity. The first request after idle may take ~30 seconds to cold-start.

---

## 💻 Local Development Setup

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.9+ and pip
- **MongoDB Atlas** account (free tier) or local MongoDB
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### 1. Clone & Navigate
```bash
git clone https://github.com/omrajput14/animal-health-management-system.git
cd animal-health-management-system
```

### 2. Start the AI Microservice (Python)
```bash
cd ml-service
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create .env file
echo "GEMINI_API_KEY=your_key_here" > .env

# Launch on port 8000
uvicorn main:app --reload --port 8000
```

### 3. Start the Backend API (Node.js)
```bash
cd ../backend
npm install

# Create .env file with:
# MONGODB_URI=your_mongodb_atlas_connection_string
# JWT_SECRET=any_random_secret_string
# ML_SERVICE_URL=http://localhost:8000/analyze

npm run dev
```

### 4. Start the Frontend (React)
```bash
cd ../frontend
npm install

# Create .env file with:
# REACT_APP_API_URL=http://localhost:5001/api/v1

npm start
```

### 5. Open Your Browser
Navigate to `http://localhost:3000` — register an account, create a farm, and start scanning! 🎉

---

## 📁 Project Structure

```
animal-health-management-system/
│
├── frontend/                    # React 18 PWA Client
│   ├── public/
│   │   ├── manifest.json        # PWA configuration
│   │   └── index.html           # Entry point with SEO meta tags
│   └── src/
│       ├── pages/               # 8 full-featured page components
│       │   ├── DashboardPage    # Analytics with Recharts
│       │   ├── ScannerPage      # AI diagnostics + PDF generation
│       │   ├── DiseaseAlertsPage# GIS map + outbreak simulation
│       │   ├── RiskAssessmentPage# Multi-step questionnaire
│       │   ├── CompliancePage   # Biosecurity checklist engine
│       │   ├── ProfilePage      # User settings
│       │   └── Auth Pages       # Login + Registration
│       ├── store/               # Redux Toolkit slices
│       ├── components/          # Reusable UI components
│       ├── i18n/                # Translation files (EN/HI/TE)
│       └── service-worker.js    # Workbox offline caching
│
├── backend/                     # Node.js + Express API
│   ├── models/                  # Mongoose schemas (5 models)
│   ├── routes/                  # RESTful endpoints (12 route files)
│   ├── middleware/              # JWT auth + error handling
│   ├── controllers/             # Business logic layer
│   └── server.js                # Express app + MongoDB connection
│
├── ml-service/                  # Python FastAPI AI Microservice
│   ├── main.py                  # Gemini Vision integration
│   └── requirements.txt         # Python dependencies
│
└── render.yaml                  # Infrastructure-as-Code for Render
```

---

## 🧪 API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `POST` | `/api/v1/auth/register` | Create new user account | ❌ |
| `POST` | `/api/v1/auth/login` | Authenticate & get JWT | ❌ |
| `GET` | `/api/v1/auth/me` | Get current user profile | 🔐 |
| `GET` | `/api/v1/farms` | List all user's farms | 🔐 |
| `POST` | `/api/v1/farms` | Create a new farm | 🔐 |
| `POST` | `/api/v1/scanner/analyze` | AI disease analysis (proxy to Python) | 🔐 |
| `GET` | `/api/v1/compliance` | Get compliance records | 🔐 |
| `POST` | `/api/v1/compliance` | Submit compliance audit | 🔐 |
| `POST` | `/api/v1/assessments` | Submit risk assessment | 🔐 |
| `GET` | `/api/v1/health` | Health check endpoint | ❌ |

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/agritech
JWT_SECRET=your_super_secret_jwt_key
ML_SERVICE_URL=http://localhost:8000/analyze
NODE_ENV=development
PORT=5001
```

### AI Microservice (`ml-service/.env`)
```env
GEMINI_API_KEY=your_google_gemini_api_key
```

### Frontend (`frontend/.env`)
```env
REACT_APP_API_URL=http://localhost:5001/api/v1
```

---

## 🎓 What I Learned Building This

- **Microservice Architecture** — Designing inter-service communication between Node.js and Python through a proxy gateway pattern
- **AI Integration** — Crafting effective prompts for Gemini Vision and parsing structured JSON responses from LLMs
- **Progressive Web Apps** — Service worker lifecycle, caching strategies (CacheFirst vs NetworkFirst), and graceful offline degradation
- **GIS & Geospatial** — Working with Leaflet.js for interactive mapping, geofencing circles, and coordinate-based proximity calculations
- **Client-Side PDF** — Generating rich, styled documents with embedded images using html2pdf.js without any server dependency
- **Cloud Deployment** — Deploying a multi-service architecture across Vercel (static) and Render (dynamic) with Infrastructure-as-Code
- **Security** — JWT authentication flows, bcrypt hashing, protected routes on both client and server
- **State Management** — Complex Redux Toolkit patterns with async thunks, loading states, and optimistic updates

---

## 👨‍💻 Author

<div align="center">

**Om Rajput**

_Data Science Student · AgriTech Builder_

[![Portfolio](https://img.shields.io/badge/Portfolio-omrajputt369.github.io-000000?style=for-the-badge&logo=github&logoColor=white)](https://omrajputt369.github.io)
[![GitHub](https://img.shields.io/badge/GitHub-omrajput14-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/omrajput14)

---

⭐ **If you found this project impressive, please consider giving it a star!** ⭐

</div>

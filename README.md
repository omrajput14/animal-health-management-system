<div align="center">
  
# 🚜 AgriTech Biosecurity System
**An Enterprise-Grade Digital Farm Management & AI Diagnostics Portal**

[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green.svg)](https://nodejs.org/)
[![FastAPI](https://img.shields.io/badge/Python-FastAPI-teal.svg)](https://fastapi.tiangolo.com/)
[![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-orange.svg)](https://deepmind.google/technologies/gemini/)
[![PWA](https://img.shields.io/badge/PWA-Offline_Ready-purple.svg)](https://web.dev/progressive-web-apps/)

</div>

## 🎯 Project Overview

This project is a comprehensive **Progressive Web App (PWA)** engineered to modernize biosecurity in agriculture. Built with a powerful microservice architecture, it combines a traditional MERN stack (MongoDB, Express, React, Node) with a dedicated Python FastAPI service powered by the **Google Gemini Vision AI** to diagnose livestock diseases from photographs in real-time.

Designed for real-world rural environments, the app features full Offline Caching capabilities, meaning it remains functional even when farmers lose internet connectivity in the field.

---

## ✨ Core Features

### 🧠 AI Disease Diagnostics Scanner
- **Gemini Vision Integration:** Upload or snap a photo of an animal, and the AI will analyze lesions, symptoms, and physical conditions to diagnose the disease.
- **Action Plans:** Automatically generates comprehensive treatment plans, isolation protocols, and confidence scores based on the diagnosis.

### 📄 Premium PDF Report Generation
- **Client-Side Rendering:** Uses `html2pdf.js` to instantly render a professional, A4-ready Medical Certificate directly in the browser.
- **Embedded Evidence:** Automatically injects the farmer's credentials, location data, and the actual uploaded photograph into the official PDF layout for veterinary use.

### 🗺️ Live GIS Disease Tracking Map
- **Leaflet Geofencing:** An interactive geographic map that tracks nearby veterinary clinics and neighboring farms.
- **Outbreak Simulation:** Features a visual "Quarantine Radius" simulator that maps out a 4km containment zone and flags at-risk farms dynamically.

### 📊 Real-Time Analytics Dashboard
- **Data Visualization:** Built with `Recharts` to display farm health metrics, biosecurity compliance scores, and historical disease trends in beautiful, interactive charts.

### 📱 Progressive Web App (PWA) & Offline Mode
- **Installable:** Functions as a native mobile application via the Web Manifest.
- **Service Worker Caching:** Built with `Workbox` to intercept network requests. If the user loses internet connection, the UI loads instantly from local cache, and offline warnings safely disable internet-dependent tools.
- **Multilingual Support:** Fully localized in English, Hindi, and Telugu using `i18next`.

---

## 🏗️ Technology Stack

### Frontend Architecture
* **Framework:** React.js 18
* **State Management:** Redux Toolkit
* **Styling:** Vanilla CSS + CSS Variables
* **Mapping:** Leaflet.js (`react-leaflet`)
* **PDF Engine:** `html2pdf.js`
* **PWA Engine:** Workbox (`workbox-core`)

### Backend Architecture
* **Primary Server:** Node.js + Express
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Authentication:** JWT (JSON Web Tokens)
* **Image Storage:** Cloudinary

### AI Microservice
* **Framework:** Python FastAPI
* **AI Model:** `google-generativeai` (Gemini 2.5 Pro Vision)
* **API Communication:** RESTful interface with Node.js backend

---

## 🚀 Quick Start Guide

### Prerequisites
- Node.js 18+
- Python 3.9+
- MongoDB Atlas Account
- Google Gemini API Key

### 1. Clone the Repository
```bash
git clone https://github.com/omrajput14/animal-health-management-system.git
cd animal-health-management-system
```

### 2. Setup the AI Microservice (Python)
```bash
cd ml-service
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Create a .env file and add: GEMINI_API_KEY=your_api_key
python main.py
```
*The AI service will run on `http://localhost:8000`*

### 3. Setup the Backend API (Node.js)
```bash
cd ../backend
npm install

# Create a .env file with your MONGO_URI and JWT_SECRET
npm run dev
```
*The Backend API will run on `http://localhost:5000`*

### 4. Setup the Frontend Client (React)
```bash
cd ../frontend
npm install

# Start the development server
npm start
```
*The Frontend will run on `http://localhost:3000`*

---

## 📸 Screenshots

*(Add screenshots of your Dashboard, AI Scanner, PDF Report, and Interactive Map here!)*

---

## 👨‍💻 Developer / Contact

**Om Rajput**  
Backend Developer & Agritech Enthusiast  
*If you are a recruiter or hiring manager reviewing this repository, please feel free to reach out via my portfolio or LinkedIn to discuss the architecture and implementation details of this project!*

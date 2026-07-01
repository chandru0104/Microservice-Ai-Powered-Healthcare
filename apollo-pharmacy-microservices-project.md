# 🏥 Apollo Pharmacy Clone — Full-Stack Microservices Portfolio Project

> **Stack:** MERN (MongoDB, Express, React, Node.js) + Microservices Architecture  
> **Experience Level:** 2 Years — Senior-Ready Portfolio Project  
> **Inspired By:** [Apollo Pharmacy](https://www.apollopharmacy.in/)  
> **Goal:** Resume-grade, production-quality, interview-impressive project

---

## 📌 Project Overview

A full-scale healthcare e-commerce platform built with microservices architecture — featuring medicine ordering, doctor consultations, lab test bookings, AI-powered disease prediction, and more. Each service is independently deployable, scalable, and communicates via REST + Message Queues.

---

## 🏗️ System Architecture

```
Client (React + Vite)
        │
        ▼
   API Gateway (Express + JWT Auth)
        │
   ┌────┴──────────────────────────────────────────────────┐
   │                  Microservices Layer                   │
   ├─────────────────┬────────────────┬────────────────────┤
   │  Auth Service   │ Product Service│  Order Service     │
   │  Payment Svc    │ Doctor Service │  Lab Test Service  │
   │  AI Prediction  │ Notification   │  Review Service    │
   │  Admin Service  │ Search Service │  Prescription Svc  │
   └─────────────────┴────────────────┴────────────────────┘
        │
   Message Broker (RabbitMQ / Kafka)
        │
   Databases (MongoDB per service — DB isolation)
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, Vite, Tailwind CSS, Redux Toolkit, React Query |
| Backend | Node.js, Express.js |
| Database | MongoDB (per service), Redis (cache + sessions) |
| Auth | JWT + Refresh Tokens, bcrypt, OAuth (Google) |
| Payment | Razorpay / Stripe API |
| Message Queue | RabbitMQ (event-driven communication) |
| File Storage | AWS S3 / Cloudinary (prescription images) |
| AI/ML | Python FastAPI + scikit-learn / TensorFlow (disease prediction) |
| API Gateway | Express Gateway / custom middleware |
| DevOps | Docker, Docker Compose, GitHub Actions CI/CD |
| Monitoring | Winston Logger, Morgan, optional: Grafana + Prometheus |

---

## 📦 Microservices Breakdown

---

### 1. 🔐 Auth Service — `PORT: 3001`

**Responsibility:** User registration, login, token management, roles

**Features:**
- Register / Login / Logout
- JWT Access Token (15 min) + Refresh Token (7 days)
- Google OAuth 2.0
- Role-based access: `user`, `doctor`, `admin`, `lab_technician`
- OTP-based phone verification (Twilio / MSG91)
- Password reset via email (Nodemailer)
- Account lockout after failed attempts

**MongoDB Schema: `users`**
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string",
  "phone": "string",
  "passwordHash": "string",
  "role": "user | doctor | admin | lab_technician",
  "isVerified": "boolean",
  "otp": "string",
  "otpExpiry": "Date",
  "refreshToken": "string",
  "createdAt": "Date"
}
```

**API Endpoints:**
```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh-token
POST   /auth/verify-otp
POST   /auth/forgot-password
POST   /auth/reset-password
GET    /auth/google
GET    /auth/google/callback
```

---

### 2. 💊 Product Service — `PORT: 3002`

**Responsibility:** Medicine catalog, categories, stock management

**Features:**
- Browse medicines by category (OTC, prescription, wellness, personal care)
- Search & filter (brand, generic, price range, availability)
- Product detail with composition, dosage, side effects
- Prescription-required flag (`rxRequired: true`)
- Stock management + low-stock alerts
- Discount / offer management

**MongoDB Schema: `products`**
```json
{
  "_id": "ObjectId",
  "name": "string",
  "genericName": "string",
  "brand": "string",
  "category": "string",
  "description": "string",
  "price": "number",
  "discountPercent": "number",
  "stock": "number",
  "rxRequired": "boolean",
  "images": ["string"],
  "dosage": "string",
  "sideEffects": ["string"],
  "composition": "string",
  "manufacturer": "string",
  "expiryDate": "Date",
  "tags": ["string"]
}
```

**API Endpoints:**
```
GET    /products
GET    /products/:id
GET    /products/search?q=paracetamol
GET    /products/category/:category
POST   /products              (admin)
PUT    /products/:id          (admin)
DELETE /products/:id          (admin)
PATCH  /products/:id/stock    (admin)
```

---

### 3. 🛒 Order Service — `PORT: 3003`

**Responsibility:** Cart management, order lifecycle, prescription upload

**Features:**
- Cart (add, update, remove items)
- Address management (multiple delivery addresses)
- Order placement with prescription validation
- Order tracking: `pending → confirmed → packed → shipped → delivered`
- Order cancellation & refund trigger
- Prescription image upload (S3/Cloudinary)
- Re-order from history

**MongoDB Schemas:**

`cart`:
```json
{
  "userId": "ObjectId",
  "items": [{ "productId": "ObjectId", "quantity": "number", "price": "number" }],
  "totalAmount": "number"
}
```

`orders`:
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "items": [{ "productId": "ObjectId", "quantity": "number", "price": "number" }],
  "totalAmount": "number",
  "status": "pending | confirmed | packed | shipped | delivered | cancelled",
  "paymentStatus": "pending | paid | refunded",
  "prescriptionUrl": "string",
  "address": { "street": "string", "city": "string", "pincode": "string" },
  "deliveryDate": "Date",
  "createdAt": "Date"
}
```

**API Endpoints:**
```
GET    /cart
POST   /cart/add
PUT    /cart/update
DELETE /cart/remove/:productId
POST   /orders
GET    /orders
GET    /orders/:id
PATCH  /orders/:id/cancel
POST   /orders/:id/prescription
```

---

### 4. 💳 Payment Service — `PORT: 3004`

**Responsibility:** Payment processing, refunds, transaction history

**Features:**
- Razorpay integration (Indian payments — UPI, cards, netbanking)
- Create order → verify payment signature
- Refund on cancellation
- Transaction history
- Webhook handling for payment events
- Invoice generation (PDF)

**Flow:**
```
User places order
      │
      ▼
Payment Service creates Razorpay Order → returns order_id
      │
      ▼
Frontend opens Razorpay checkout
      │
      ▼
Payment success → webhook fires → verify signature
      │
      ▼
Emit event to Order Service → update order status
```

**MongoDB Schema: `transactions`**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "orderId": "ObjectId",
  "razorpayOrderId": "string",
  "razorpayPaymentId": "string",
  "amount": "number",
  "status": "pending | success | failed | refunded",
  "method": "upi | card | netbanking | wallet",
  "createdAt": "Date"
}
```

**API Endpoints:**
```
POST   /payment/create-order
POST   /payment/verify
POST   /payment/refund/:transactionId
GET    /payment/history
POST   /payment/webhook      (Razorpay webhook)
```

---

### 5. 🩺 Doctor Consultation Service — `PORT: 3005`

**Responsibility:** Doctor listing, appointment booking, video consultation

**Features:**
- Doctor profiles (specialization, experience, ratings, fees)
- Filter by specialty, language, availability, fees
- Slot-based appointment booking
- Video call integration (WebRTC / Daily.co / Agora)
- Consultation notes & prescription generation
- Follow-up appointment
- Doctor availability calendar management

**MongoDB Schemas:**

`doctors`:
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "name": "string",
  "specialization": "string",
  "experience": "number",
  "rating": "number",
  "consultationFee": "number",
  "languages": ["string"],
  "qualifications": ["string"],
  "availability": [{ "day": "string", "slots": ["string"] }],
  "isVerified": "boolean"
}
```

`appointments`:
```json
{
  "_id": "ObjectId",
  "patientId": "ObjectId",
  "doctorId": "ObjectId",
  "slot": "Date",
  "status": "booked | completed | cancelled | no-show",
  "type": "video | in-person",
  "notes": "string",
  "prescription": "string",
  "fee": "number",
  "meetingLink": "string"
}
```

**API Endpoints:**
```
GET    /doctors
GET    /doctors/:id
GET    /doctors/:id/slots?date=2024-01-01
POST   /appointments
GET    /appointments
GET    /appointments/:id
PATCH  /appointments/:id/cancel
POST   /appointments/:id/notes   (doctor only)
GET    /appointments/:id/join    (video link)
```

---

### 6. 🧪 Lab Test Service — `PORT: 3006`

**Responsibility:** Lab test catalog, booking, sample collection, report delivery

**Features:**
- Test catalog (blood test, urine test, COVID, thyroid, diabetes panel, etc.)
- Package deals (full body checkup)
- Home sample collection booking with time slot
- Track sample: `booked → sample collected → processing → report ready`
- Report download (PDF)
- Integration with NABL-certified lab partners
- Fasting instructions notification

**MongoDB Schemas:**

`tests`:
```json
{
  "_id": "ObjectId",
  "name": "string",
  "description": "string",
  "price": "number",
  "parameters": ["string"],
  "fastingRequired": "boolean",
  "reportTime": "string",
  "homeCollectionAvailable": "boolean",
  "category": "string"
}
```

`labBookings`:
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "testIds": ["ObjectId"],
  "address": "object",
  "collectionSlot": "Date",
  "status": "booked | collected | processing | completed",
  "reportUrl": "string",
  "totalAmount": "number",
  "patientAge": "number",
  "patientGender": "string"
}
```

**API Endpoints:**
```
GET    /tests
GET    /tests/:id
GET    /tests/category/:category
POST   /lab-bookings
GET    /lab-bookings
GET    /lab-bookings/:id
PATCH  /lab-bookings/:id/status   (lab technician)
GET    /lab-bookings/:id/report
```

---

### 7. 🤖 AI Disease Prediction Service — `PORT: 8000 (Python FastAPI)`

**Responsibility:** Symptom-based disease prediction using ML

**Features:**
- Input symptoms → predict top 3 probable diseases
- Confidence score for each prediction
- Suggest specialist doctor type
- Suggest relevant lab tests
- Disclaimer: "Not a substitute for professional diagnosis"
- Model trained on symptom-disease dataset (Kaggle)

**Tech Stack:**
- Python 3.11 + FastAPI
- scikit-learn (Random Forest / Naive Bayes)
- Pandas, NumPy for preprocessing
- Joblib for model serialization
- Optional: TensorFlow for deep learning model

**ML Model Training (Offline):**
```python
# Dataset: symptom_disease.csv
# Features: 132 symptom binary columns
# Target: disease name (41 classes)
# Model: RandomForestClassifier (accuracy ~95%)
# Saved as: model.pkl + label_encoder.pkl
```

**API Endpoints:**
```
POST   /predict
       Body: { "symptoms": ["fever", "headache", "fatigue"] }
       Response: {
         "predictions": [
           { "disease": "Malaria", "confidence": 0.82, "specialist": "General Physician" },
           { "disease": "Dengue", "confidence": 0.11, "specialist": "General Physician" }
         ],
         "suggestedTests": ["CBC", "Dengue NS1 Antigen"],
         "disclaimer": "..."
       }

GET    /symptoms              (list all valid symptom inputs)
GET    /diseases              (list all predictable diseases)
GET    /health                (service health check)
```

---

### 8. 🔔 Notification Service — `PORT: 3007`

**Responsibility:** Email, SMS, push notification delivery

**Features:**
- Email: Order confirmation, prescription upload reminder, report ready (Nodemailer + Gmail / SendGrid)
- SMS: OTP, appointment reminder, delivery status (Twilio / MSG91)
- Push Notifications: Browser push for order updates (Web Push API)
- Notification history stored in DB
- Template engine for messages (Handlebars)

**Triggers (via RabbitMQ events):**
```
order.placed          → Send order confirmation email + SMS
payment.success       → Send payment receipt email
appointment.booked    → Send appointment confirmation + reminder 1hr before
lab.report.ready      → Send report ready email with download link
order.status.updated  → Send tracking update SMS
user.registered       → Send welcome email + OTP
```

---

### 9. 📝 Review & Rating Service — `PORT: 3008`

**Responsibility:** Product and doctor reviews

**Features:**
- Star rating (1-5) with written review
- Verified purchase badge (only delivered order buyers can review)
- Helpful/Not Helpful voting
- Review moderation (admin)
- Average rating calculation & aggregation
- Sort by: newest, highest rated, most helpful

**MongoDB Schema: `reviews`**
```json
{
  "_id": "ObjectId",
  "userId": "ObjectId",
  "targetId": "ObjectId",
  "targetType": "product | doctor",
  "rating": "number",
  "title": "string",
  "body": "string",
  "isVerifiedPurchase": "boolean",
  "helpfulCount": "number",
  "status": "pending | approved | rejected",
  "createdAt": "Date"
}
```

---

### 10. 💊 Prescription Service — `PORT: 3009`

**Responsibility:** Digital prescription management

**Features:**
- Upload prescription image → OCR extraction (Tesseract.js / AWS Textract)
- Doctor-generated digital prescriptions
- Prescription validity check (date + doctor registration)
- Prescription linked to orders and doctor consultations
- Auto-suggest medicines from prescription text

---

### 11. 🔍 Search Service — `PORT: 3010`

**Responsibility:** Fast full-text search across medicines, doctors, tests

**Features:**
- Elasticsearch / MongoDB Atlas Search
- Auto-suggestions / autocomplete
- Spell correction ("paracetamol" → suggests if misspelled)
- Search by: name, generic name, brand, symptom, category
- Search analytics (trending searches)

---

### 12. 🛡️ Admin Service — `PORT: 3011`

**Responsibility:** Dashboard and platform management

**Features:**
- Manage products (CRUD + stock)
- Manage doctors (verify, approve, deactivate)
- Manage orders (view all, update status)
- Manage lab bookings
- User management (ban, role change)
- Analytics dashboard: Revenue, Orders, Users, Top products
- Review moderation

---

## 🌐 API Gateway — `PORT: 3000`

**Responsibility:** Single entry point for all services

**Features:**
- Route requests to correct microservice
- JWT authentication middleware (verify on every request)
- Rate limiting (express-rate-limit)
- Request logging (Morgan)
- CORS configuration
- Error handling middleware

**Route Map:**
```
/api/auth/*         → Auth Service :3001
/api/products/*     → Product Service :3002
/api/orders/*       → Order Service :3003
/api/payment/*      → Payment Service :3004
/api/doctors/*      → Doctor Service :3005
/api/labs/*         → Lab Service :3006
/api/predict/*      → AI Service :8000
/api/reviews/*      → Review Service :3008
/api/search/*       → Search Service :3010
/api/admin/*        → Admin Service :3011
```

---

## 🖥️ Frontend Architecture

**Tech:** React 18 + Vite + Tailwind CSS + Redux Toolkit + React Query

**Pages:**
```
/                        → Home (featured products, offers, health tips)
/medicines               → Product listing with filters
/medicines/:id           → Product detail
/cart                    → Cart page
/checkout                → Checkout (address + payment)
/orders                  → Order history
/orders/:id              → Order tracking
/doctors                 → Doctor listing
/doctors/:id             → Doctor profile + book slot
/consultation/:id        → Video consultation room
/labs                    → Lab test listing
/labs/:id                → Test detail + book
/lab-bookings            → My lab bookings
/predict                 → AI Symptom Checker
/profile                 → User profile + addresses
/prescriptions           → My prescriptions
/admin/*                 → Admin dashboard (protected)
```

**State Management:**
```
Redux Toolkit:  Auth state, Cart state, UI state
React Query:    Server state (products, orders, doctors - with caching)
LocalStorage:   Cart persistence, theme preference
```

---

## 📡 Event-Driven Communication (RabbitMQ)

```
Exchange: healthcare_events  (topic exchange)

Events:
user.registered          → Notification Service (welcome email)
order.placed             → Notification Service + Product Service (stock decrement)
order.cancelled          → Payment Service (trigger refund) + Notification Service
payment.success          → Order Service (confirm order)
payment.failed           → Order Service (cancel order)
appointment.booked       → Notification Service (confirmation + reminder)
lab.booking.placed       → Notification Service
lab.report.ready         → Notification Service (report email)
review.submitted         → Admin Service (moderation queue)
```

---

## 🐳 Docker & Deployment

**docker-compose.yml structure:**
```yaml
services:
  api-gateway:     { build, ports: 3000, env }
  auth-service:    { build, ports: 3001, depends_on: [mongo-auth, redis] }
  product-service: { build, ports: 3002, depends_on: [mongo-product] }
  order-service:   { build, ports: 3003, depends_on: [mongo-order, rabbitmq] }
  payment-service: { build, ports: 3004, depends_on: [mongo-payment] }
  doctor-service:  { build, ports: 3005, depends_on: [mongo-doctor] }
  lab-service:     { build, ports: 3006, depends_on: [mongo-lab] }
  ai-service:      { build: ./ai-service, ports: 8000 }
  notification-service: { build, ports: 3007, depends_on: [rabbitmq] }
  review-service:  { build, ports: 3008 }
  admin-service:   { build, ports: 3011 }
  
  # Infrastructure
  rabbitmq:        { image: rabbitmq:management, ports: 5672, 15672 }
  redis:           { image: redis:alpine, ports: 6379 }
  mongo-auth:      { image: mongo, volumes }
  mongo-product:   { image: mongo, volumes }
  # ... (one mongo per service for true isolation)
  
  frontend:        { build: ./client, ports: 5173 }
```

---

## 📁 Folder Structure

```
apollo-clone/
├── client/                      # React Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/               # Redux slices
│   │   ├── hooks/               # Custom hooks
│   │   ├── services/            # API calls
│   │   └── utils/
│   ├── public/
│   └── package.json
│
├── services/
│   ├── api-gateway/
│   ├── auth-service/
│   ├── product-service/
│   ├── order-service/
│   ├── payment-service/
│   ├── doctor-service/
│   ├── lab-service/
│   ├── notification-service/
│   ├── review-service/
│   ├── prescription-service/
│   ├── search-service/
│   └── admin-service/
│
├── ai-service/                  # Python FastAPI
│   ├── main.py
│   ├── model/
│   │   ├── train.py
│   │   ├── model.pkl
│   │   └── label_encoder.pkl
│   ├── routes/
│   └── requirements.txt
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── .env.example
└── README.md
```

**Each Node.js Service Structure:**
```
service-name/
├── src/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── services/           # Business logic
│   ├── events/             # RabbitMQ publishers & consumers
│   └── utils/
├── Dockerfile
├── .env
└── package.json
```

---

## 🗺️ Development Roadmap

### Phase 1 — Foundation (Week 1-2)
- [ ] Set up monorepo structure + Docker Compose
- [ ] Auth Service (register, login, JWT, refresh tokens)
- [ ] API Gateway with auth middleware
- [ ] React frontend scaffold (routing, Redux, React Query)
- [ ] User profile + address management

### Phase 2 — Core Commerce (Week 3-4)
- [ ] Product Service (catalog, search, categories)
- [ ] Cart functionality (frontend + backend)
- [ ] Order Service (place order, order history)
- [ ] Payment Service (Razorpay integration)
- [ ] Prescription upload (S3/Cloudinary)

### Phase 3 — Healthcare Services (Week 5-6)
- [ ] Doctor Service (profiles, slot booking)
- [ ] Video consultation (WebRTC / Daily.co)
- [ ] Lab Test Service (catalog, home collection booking)
- [ ] Notification Service (RabbitMQ events, email, SMS)

### Phase 4 — AI & Advanced Features (Week 7-8)
- [ ] AI Disease Prediction Service (Python FastAPI + ML model)
- [ ] Review & Rating Service
- [ ] Prescription OCR (Tesseract.js)
- [ ] Search Service (autocomplete, full-text)

### Phase 5 — Admin & Polish (Week 9-10)
- [ ] Admin Dashboard (analytics, user/product management)
- [ ] CI/CD pipeline (GitHub Actions → DockerHub → VPS)
- [ ] Unit + Integration tests (Jest + Supertest)
- [ ] Deploy (AWS EC2 / Railway / Render)
- [ ] README + Postman collection

---

## 🌟 Additional Features to Consider

| Feature | Service | Complexity |
|---|---|---|
| Health Articles / Blog | Content Service | Medium |
| Medicine Subscription | Subscription Service | Medium |
| Loyalty Points / Wallet | Wallet Service | Medium |
| Nearby Pharmacy Locator | Location Service + Google Maps API | Medium |
| Medicine Reminder | Reminder Service + Push Notification | Low |
| Multi-language Support (i18n) | Frontend | Low |
| Dark Mode | Frontend | Low |
| Chat Support (Live Chat / Chatbot) | Chat Service + Socket.io | High |
| Insurance Claim Integration | Insurance Service | High |
| Ambulance Booking | Emergency Service | High |
| Health Records / ABHA Integration | Health Records Service | High |

---

## 🔒 Security Checklist

- [ ] JWT stored in httpOnly cookies (not localStorage)
- [ ] Refresh token rotation
- [ ] Rate limiting on auth endpoints (max 5 attempts)
- [ ] Input validation with Joi / Zod on every endpoint
- [ ] Helmet.js (HTTP security headers)
- [ ] HTTPS only in production
- [ ] Razorpay signature verification (prevent payment tampering)
- [ ] File upload validation (type, size, virus scan)
- [ ] Role-based access control on all admin routes
- [ ] MongoDB injection prevention (mongoose sanitize)
- [ ] Environment variables — never commit `.env`

---

## 📊 Resume Highlights (What to Say in Interviews)

**"I built a healthcare microservices platform with 10+ independently deployable services..."**

- Implemented **JWT + Refresh Token** auth with role-based access control across services
- Designed **event-driven architecture** using RabbitMQ for async inter-service communication
- Integrated **Razorpay payment gateway** with webhook signature verification
- Built an **AI disease prediction service** using Python FastAPI + Random Forest classifier
- Implemented **WebRTC-based video consultation** between patients and doctors
- Used **Docker Compose** for local development with service isolation
- Designed **MongoDB schema per service** for true microservice data isolation
- Set up **CI/CD pipeline** with GitHub Actions for automated builds and deployment

---

## 🧪 Better Prompt for Claude / ChatGPT

Use this prompt to get detailed help on any specific part of this project:

```
I am building a production-grade healthcare e-commerce platform (Apollo Pharmacy clone)
using MERN stack + Microservices architecture. I have 2 years of experience.

The project has these services:
- Auth Service (JWT, OAuth, OTP)
- Product Service (medicine catalog)
- Order Service (cart, orders, prescription upload)
- Payment Service (Razorpay)
- Doctor Service (booking, video consultation)
- Lab Test Service (home collection, reports)
- AI Disease Prediction (Python FastAPI + ML)
- Notification Service (email, SMS, RabbitMQ)
- Review Service
- Prescription Service (OCR)
- Search Service
- Admin Service

Services communicate via RabbitMQ (event-driven).
Each service has its own MongoDB database.
API Gateway handles auth + routing.
Frontend is React 18 + Vite + Tailwind CSS + Redux Toolkit + React Query.
Dockerized with docker-compose.

[NOW ASK YOUR SPECIFIC QUESTION HERE — e.g.:]
"Help me design the RabbitMQ event flow for when a user places an order"
"Write the Payment Service with Razorpay webhook verification"
"How do I train the disease prediction ML model and serve it with FastAPI"
"Help me set up the API Gateway with JWT verification middleware"
```

---

*Built with ❤️ as a portfolio project | MERN + Microservices | 2 Years Experience*

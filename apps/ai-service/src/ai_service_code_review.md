# 🏥 AI-Service — Comprehensive Code Review

> **Read-only review. No code was changed.**  
> Files reviewed: `app.ts`, `main.ts`, `router.ts`, `aiController.ts`, `auth.ts`, `aiService.ts`, `openai.ts`, `multer.ts`, `swagger.ts`, `package.json`

---

## 1. 🏗️ OVERALL ARCHITECTURE

```
main.ts  ──►  app.ts  ──►  router.ts  ──►  aiController.ts  ──►  aiService.ts
                                │                                    │
                          middleware/auth.ts               utils/openai.ts
                          utils/multer.ts                  pdf-parse / tesseract
```

**Pattern Used:** Layered Architecture (Router → Controller → Service → Util)

| Layer | File | Responsibility |
|---|---|---|
| Entry Point | `main.ts` | Server bootstrap |
| App Config | `app.ts` | Express middleware setup |
| Router | `router.ts` | Route definitions + Swagger docs |
| Controller | `aiController.ts` | HTTP request/response handling |
| Service | `aiService.ts` | Business logic + AI calls |
| Middleware | `auth.ts` | JWT Authentication |
| Utils | `openai.ts`, `multer.ts`, `swagger.ts` | Reusable helpers |

**Architecture Rating: ✅ Good for a microservice**
- Proper separation of concerns achieved
- Controller-Service pattern is correctly applied
- BUT — the architecture is thin and missing error handling, validation, and type safety layers

---

## 2. 🌟 CODE QUALITY & RATING

### Overall Score: **5.5 / 10**

| Category | Score | Notes |
|---|---|---|
| Structure & Organization | 7/10 | Good folder layout |
| Type Safety | 3/10 | Heavy use of `any` type |
| Error Handling | 4/10 | Generic, surface-level errors |
| Consistency | 5/10 | Mixed formatting/conventions |
| Naming | 6/10 | Mostly clear but some vague names |
| Code Cleanliness | 5/10 | Debug `console.log` left in prod code |
| Documentation | 5/10 | Swagger docs are incomplete/wrong |

### 🐛 Critical Bugs Found

#### Bug 1 — Typo in Response Key (`aiController.ts` line 51)
```typescript
// ❌ WRONG — "daat" is a typo, frontend will receive undefined
daat: report

// ✅ Should be
data: report
```

#### Bug 2 — No `req.file` check in `aiMedicineReportController` (`aiController.ts` line 44–58)
```typescript
// ❌ No guard — if no file uploaded, req.file is undefined
// aiReportController checks it, but aiMedicineReportController does NOT
const report = await aiMedicineReportService(req.file) // could be undefined!
```

#### Bug 3 — Swagger API path is broken (`swagger.ts` line 19)
```typescript
// ❌ Wrong — absolute path will NEVER resolve in production
apis: ["/apps/ai-service/src/router/router.ts"]

// ✅ Should use relative path
apis: ["./src/router/router.ts"]
// or with __dirname
apis: [path.join(__dirname, "../router/router.ts")]
```

#### Bug 4 — Multer runs BEFORE Auth in `/report` and `/medicine` routes (`router.ts` line 59)
```typescript
// ❌ Unauthenticated users can upload files — security risk!
router.post("/report", upload.single("file"), authMiddleware, aiReportController)

// ✅ Auth MUST come first
router.post("/report", authMiddleware, upload.single("file"), aiReportController)
```

---

## 3. 🧠 BACKEND KNOWLEDGE & SKILL LEVEL EVALUATION

### Skill Level: **Intermediate Beginner (Junior Level)**

| Skill | Assessment |
|---|---|
| Express.js | ✅ Comfortable — knows routing, middleware, response patterns |
| TypeScript | ⚠️ Partial — uses `any` heavily, doesn't leverage interfaces/generics |
| JWT Auth | ✅ Basic understanding — but `Bearer` prefix check has a bug (see Security) |
| File Handling | ✅ Knows multer, memory storage |
| AI/OpenAI SDK | ✅ Good — structured prompt engineering is solid |
| Error Handling | ❌ Weak — no custom error classes, no global error handler |
| Input Validation | ❌ Missing — no Zod/Joi/class-validator used |
| Security Awareness | ⚠️ Basic — helmet + cors used, but auth ordering is wrong |
| Logging | ❌ Console.log only — no structured logging (Winston/Pino) |
| Environment Config | ⚠️ dotenv used but called multiple times in different files |

**Verdict:** Developer has a solid grasp of Express and service structure, but lacks depth in production-grade patterns like validation, structured error handling, and security hardening.

---

## 4. 🛠️ TECHNOLOGY STACK ANALYSIS

| Technology | Version / Usage | Assessment |
|---|---|---|
| **Node.js + Express** | v4.21.2 | ✅ Good choice for microservice |
| **TypeScript** | tsconfig present | ✅ Good — but underutilized |
| **OpenAI SDK** | Groq baseURL | ✅ Smart — using Groq for speed/cost |
| **pdf-parse-new** | Used for PDF text | ✅ Appropriate |
| **tesseract.js** | OCR for images | ✅ Appropriate, but slow — no timeout |
| **JWT (jsonwebtoken)** | Auth middleware | ✅ Correct choice |
| **multer** | File upload | ✅ Memory storage appropriate for small files |
| **helmet** | Security headers | ✅ Good |
| **compression** | Gzip | ✅ Good |
| **swagger-jsdoc + swagger-ui-express** | API docs | ⚠️ Configured incorrectly |
| **Nx** | Monorepo build tool | ✅ Good for multi-service setup |
| **dotenv** | Environment config | ⚠️ Called in multiple files — should be called once |

### ⚠️ Model Name Issue (`aiService.ts` line 70, 135, 205)
```typescript
model: "openai/gpt-oss-20b"  // ❌ This is NOT a valid Groq model name
```
Valid Groq models: `llama3-70b-8192`, `llama-3.1-8b-instant`, `mixtral-8x7b-32768`, etc.

---

## 5. 🧩 LOGIC & BUSINESS LOGIC REVIEW

### `aiSymptomsService`
- ✅ Structured prompt with clear JSON schema — good prompt engineering
- ✅ Optional symptoms (option2–option5) handled
- ❌ `undefined` options are directly injected into prompt: `${option1},${option2}` → outputs "undefined" string to AI
- ❌ No validation on minimum symptom count

### `aiReportService`
- ✅ PDF text extraction before AI call — good architecture
- ✅ Validates empty text after extraction
- ❌ `PdfParse(file.buffer)` — called without `await` then `await`-ed separately (double-await antipattern but functional)
- ❌ No file type/extension check — any file accepted as "PDF"

### `aiMedicineReportService`
- ✅ OCR → AI pipeline is solid
- ✅ Fallback text if OCR fails
- ❌ `console.log("Received file object:", file)` — **debug log left in production code**
- ❌ No image type validation (JPEG/PNG only accepted)
- ❌ Tesseract OCR has no timeout — can hang indefinitely on large images
- ❌ No file size limit for images in multer config

---

## 6. 🌐 API DESIGN & REST STANDARDS

### Endpoints

| Method | Path | Issue |
|---|---|---|
| POST | `/symptoms` | ✅ Acceptable |
| POST | `/report` | ✅ Acceptable |
| POST | `/medicine` | ⚠️ Vague — should be `/medicine-report` or `/medicine/scan` |

### Issues Found

#### ❌ No Base Path in Router
```typescript
// app.ts — router is mounted at root
app.use((router))  // ← No prefix like "/api/v1/ai"

// But Swagger documents say:
// /api/v1/ai/symptoms  ← mismatch!
```
The actual routes served are `/symptoms`, `/report`, `/medicine` — NOT `/api/v1/ai/...` as documented.

#### ❌ Wrong Swagger Content Type for File Upload (`router.ts` line 49–55)
```yaml
# ❌ Wrong — files need multipart/form-data, not application/json
content:
  application/json:
    schema:
      type: file  # ← "file" is not a valid OpenAPI type
```

#### ❌ Error responses always use `400`
```typescript
// ❌ All errors return 400 — should vary
res.status(400)  // for auth errors → should be 401
res.status(400)  // for not found → should be 404
res.status(400)  // for server errors → should be 500
```

#### ❌ No API versioning enforced in router
The router should be mounted as:
```typescript
app.use("/api/v1/ai", router)
```

---

## 7. 🔐 SECURITY REVIEW

### Security Score: **4 / 10**

| Issue | Severity | Details |
|---|---|---|
| Auth before multer | 🔴 HIGH | Files can be uploaded by unauthenticated users |
| `Bearer` prefix check bug | 🟠 MEDIUM | `headers.startsWith("Bearer")` — missing space after "Bearer" |
| CORS hardcoded | 🟡 LOW | `origin: "http://localhost:3000"` — not configurable via env |
| No rate limiting | 🔴 HIGH | AI endpoints have no `express-rate-limit` — can be abused |
| No file type validation | 🟠 MEDIUM | Any file can be uploaded to `/report` and `/medicine` |
| No file size limit | 🟠 MEDIUM | `multer` has no `limits.fileSize` configured |
| Debug log in production | 🟡 LOW | `console.log` exposes file object in production logs |
| `dotenv.config()` in middleware | 🟡 LOW | Should only be called once in `main.ts` |
| ACCESS_SECRET_KEY undefined risk | 🟠 MEDIUM | If env var missing, JWT verify throws — no startup validation |

### Bearer Token Bug Detail (`auth.ts` line 11):
```typescript
// ❌ Current — "Bearer" without space — would also match "Bearerxyz..."
if (!headers.startsWith("Bearer"))

// ✅ Correct — should check for "Bearer " (with space)
if (!headers.startsWith("Bearer "))
```

---

## 8. ⚡ PERFORMANCE & SCALABILITY

### Performance Score: **4 / 10**

| Issue | Severity | Details |
|---|---|---|
| No request timeout | 🔴 HIGH | AI + Tesseract calls can take 30s+ — no timeout set |
| Tesseract runs in-process | 🟠 MEDIUM | OCR blocks Node.js event loop on large images |
| No response caching | 🟡 LOW | Same symptom queries hit AI API every time |
| No queue/async job system | 🟠 MEDIUM | Heavy AI tasks block the HTTP request |
| Memory storage for files | 🟡 LOW | OK for small files, but risky for large PDFs/images |
| No connection pooling | 🟡 LOW | Not needed for stateless service, but OpenAI client should be singleton ✅ |
| No health check endpoint | 🟠 MEDIUM | No `/health` or `/ping` route — load balancers can't check liveness |
| dotenv called multiple times | 🟡 LOW | Minor overhead; `openai.ts` and `auth.ts` both call `dotenv.config()` |
| No streaming for AI responses | 🟡 LOW | Large AI responses wait fully before sending — streaming would improve UX |

---

## 📋 SUMMARY — What To Fix (Priority Order)

| Priority | Issue | File |
|---|---|---|
| 🔴 P0 | Typo `daat` → `data` | `aiController.ts:51` |
| 🔴 P0 | Add `req.file` check in medicine controller | `aiController.ts:44` |
| 🔴 P0 | Auth middleware BEFORE multer | `router.ts:59,82` |
| 🔴 P0 | Fix model name to valid Groq model | `aiService.ts:70,135,205` |
| 🔴 P0 | Mount router at `/api/v1/ai` | `app.ts:21` |
| 🟠 P1 | Bearer space fix: `"Bearer "` | `auth.ts:11` |
| 🟠 P1 | Fix Swagger file path | `swagger.ts:19` |
| 🟠 P1 | Fix Swagger content-type for file upload | `router.ts:49–55` |
| 🟠 P1 | Add rate limiting to AI endpoints | `router.ts` |
| 🟠 P1 | Filter undefined options in symptom prompt | `aiService.ts:21` |
| 🟠 P1 | Add file type validation | `multer.ts` |
| 🟡 P2 | Remove debug `console.log` | `aiService.ts:151` |
| 🟡 P2 | Use correct HTTP status codes | `aiController.ts` |
| 🟡 P2 | Add `/health` endpoint | `router.ts` |
| 🟡 P2 | Call `dotenv.config()` only in `main.ts` | `auth.ts`, `openai.ts` |
| 🟡 P2 | Add request timeout for AI calls | `aiService.ts` |
| 🟡 P2 | Move CORS origin to env variable | `app.ts:16` |

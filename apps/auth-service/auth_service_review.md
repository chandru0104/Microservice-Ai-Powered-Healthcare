# 🔐 Auth Service — Code Audit Report (Re-Analysis)
> **Scope:** `apps/auth-service` · `apps/auth-service-e2e`
> **Review Type:** Read-only · Post-change re-analysis
> **Stack:** Node.js · Express · TypeScript · MongoDB/Mongoose · Kafka · Redis · JWT · Google OAuth

---

## 1. 🏗️ ARCHITECTURE REVIEW

### ✅ Fixed Since Last Review
- `main.ts` now imports **both** `emailConsumer` AND `emailConsumerDoctor` — dual consumer start issue resolved
- `emailProducerDoctor` now uses a **separate topic** `reset-password-doctor` (previously both used `reset-password`) — double-email bug fixed
- `googleLogin.ts` removed `dotenv` entirely — `dotenv.config` missing `()` bug eliminated

### 🔴 Remaining / New Issues

| Issue | Severity | File |
|---|---|---|
| All 3 entity schemas (User, Doctor, Admin) still in single `loginModel.ts` | 🟡 Medium | `loginModel.ts` |
| No global Express error middleware — each controller handles errors locally | 🟡 Medium | `app.ts` |
| `roleModel.ts` schemas still never used in any service (dead code) | 🟡 Medium | `roleModel.ts` |
| `emailConsumerDoctor.ts` — `JSON.parse(message.toString())` parses the entire Kafka message object, not `message.value` — **data will always be undefined/corrupt** | 🔴 Critical | `emailConsumerDoctor.ts:28` |
| `emailConsumer` still has `fromBeginning: true` — replays all old OTP emails on every restart | 🔴 Critical | `emailConsumer.ts:19` |
| `emailConsumer` calls `consumer.connect()` without `await` — race condition on startup | 🟡 Medium | `emailConsumer.ts:14` |

---

## 2. 📝 CODE QUALITY & RATING

### ✅ Improvements Made
- `verifyOtpController.ts` filename corrected (was `verfiyOtpController.ts`)
- `verifyOtpService.ts` filename corrected (was `verfiyOtpService.ts`)
- Controller interfaces defined (`loginData`, `doctorAuth`, `newPasswordData`)
- `dotenv.config()` removed from `googleLogin.ts`

### ❌ Still Unresolved

#### Typos & Naming Issues
| Location | Issue |
|---|---|
| `errorHaddler.ts` | Filename still misspelled — should be `errorHandler.ts` |
| `forgotPasswordContrroller` | Double `r` in controller name — still present in `forgotPasswordController.ts` |
| `resetPassowrdDoctorController.ts` | `Passoword` misspelling still in filename |
| `verfiyOtpDoctorController.ts` | `verfiy` → `verify` — still typo in filename |
| `verfiyOtpDoctorService.ts` | Same typo in service filename |
| `loginSevice` | `Sevice` → `Service` — function name in `login.ts` still wrong |
| `resetToekn` | `Toekn` → `Token` — still in `forgotPasswordController.ts` line 16 & 21 |
| `emailConsumerDoctor.ts:39` | `send emain in ${email}` — log message still has typo |
| `doctorForgotService.ts` | Exports `forgotPasswordService` — name clashes with user's `forgotPasswordService` |
| `refreshTokenDoctorService.ts:22` | New access token signed with `refreshKey` instead of `ACCESS_SECRET_KEY` — **wrong secret used!** |

#### Code Style Issues
- Mixed CRLF/LF line endings still present (doctor service files use CRLF, user service files use LF)
- `dotenv.config()` still called redundantly in `loginMiddleware.ts` (already called in `main.ts`)
- Some services still wrap try/catch internally while others don't — inconsistent pattern
- `forgotPasswordController.ts` passes `req.body` (object) to `forgotPasswordService(email: string)` — **type mismatch**, should be `req.body.email`

#### Type Safety
- `req: any, res: any` still in `loginMiddleware.ts` instead of `Request, Response`
- `token: any` parameter in `refreshTokenDoctorService`
- `email: string, otp: string` in producers — improved, but still no runtime validation

### Code Quality Score: **5.5 / 10** *(unchanged — improvements offset by new bugs)*

---

## 3. 🎓 BACKEND KNOWLEDGE & SKILL LEVEL EVALUATION

### ❌ Gaps Still Present
- ❌ No rate limiting on login or OTP endpoints (brute force vulnerability)
- ❌ No input sanitization / validation library (Joi/Zod/class-validator)
- ❌ No refresh token rotation or invalidation
- ❌ No account lockout after N failed login attempts
- ❌ No email format validation before DB query
- ❌ RBAC schema exists but still unused — middleware loads permissions, nothing enforces them
- ❌ No health check endpoint (`/health`)
- ❌ Producer connects fire-and-forget without retry logic

### Skill Level Estimate: **Intermediate (Junior → Mid transition)** *(unchanged)*

---

## 4. 🛠️ TECHNOLOGY STACK ANALYSIS

| Technology | Usage | Assessment |
|---|---|---|
| **Node.js + Express** | HTTP server, routing | ✅ Correct |
| **TypeScript** | Partially used | ⚠️ Underutilized — many `any` types remain |
| **MongoDB + Mongoose** | Data persistence | ✅ Appropriate |
| **KafkaJS** | Async email events | ✅ Good; topics now separated correctly |
| **Upstash Redis** | OTP + reset token TTL | ✅ Correct |
| **bcrypt** | Hashing | ✅ Correct |
| **jsonwebtoken** | JWT | ✅ Standard |
| **google-auth-library** | Google OAuth2 | ✅ Official library |
| **nodemailer** | Email via consumer | ✅ Works |
| **swagger-jsdoc + swagger-ui-express** | API docs | ✅ Present |
| **helmet + morgan + compression** | Security & logging | ✅ Applied |

### Stack Verdict
Stack choices remain industry-appropriate. Kafka topic separation is a meaningful improvement.

---

## 5. 🧠 LOGIC & BUSINESS LOGIC REVIEW

### User Login Flow ⚠️ Partially Fixed
- `forgotPasswordController` passes `req.body` (entire body object) to `forgotPasswordService(email: string)` — **type mismatch**, function expects a string but receives `{ email: "..." }`
- ❌ Still no `is_active` check on user login
- ❌ `resetToekn` is still `undefined` in response (service returns nothing, controller sends it)
- ❌ `verifyOtpService` still uses global `"resetToken"` key — not user-scoped → **concurrent user token collision**

### Doctor Login Flow ⚠️ Critical Bug Remains
- **Both tokens still use `"1hr"`** — `refreshToken` on line 39 in `doctorLoginServices.ts` still has `expiresIn: "1hr"` (not `"7d"`) — **refresh token TTL bug unfixed**
- Doctor forgot password: `verfiyOtpDoctorService` now correctly scopes reset token to `email:${email}` ✅
- `resetDoctorPasswordService` correctly reads from `email:${email}` ✅

### Doctor Refresh Token Flow 🔴 NEW Critical Bug
```typescript
// refreshTokenDoctorService.ts line 22
const accessToken = jwt.sign({ ... }, refreshKey, { expiresIn: "1hr" })
//                                     ^^^^^^^^^^
// NEW ACCESS TOKEN IS BEING SIGNED WITH THE REFRESH SECRET KEY — WRONG!
// Should use: process.env.ACCESS_SECRET_KEY
```
This means doctor access tokens cannot be verified by any middleware that uses `ACCESS_SECRET_KEY`.

### emailConsumerDoctor Flow 🔴 Critical Bug
```typescript
// emailConsumerDoctor.ts line 28
const data = JSON.parse(message.toString()) // ❌ Wrong — parses the Kafka message object
// Should be:
const data = JSON.parse(message.value?.toString()) // ✅
```
Doctor OTP emails will **never be sent** — the parse fails silently (empty catch block).

### Admin Login Flow ✅ Correct
- Properly uses `Admin` model, bcrypt, JWT with correct TTLs

### Google OAuth Flows ✅ Correct (Both User & Doctor)
- `googleLoginService.ts` — clean, no dotenv, correct token signing
- `doctorGoogleLoginService.ts` — properly updates name/picture on re-login

### OTP Security
- ✅ OTP hashed with bcrypt before Redis storage
- ✅ Redis TTL set on keys
- ⚠️ OTP range still `100000 + Math.random() * 90000` → range is 100000–189999 only (should be `Math.floor(Math.random() * 900000) + 100000`)

---

## 6. 🗄️ DATABASE & MONGOOSE REVIEW

### ✅ Fixed
- User schema: `required: true` now correctly used on `email`, `password`, `is_google_login`
- Doctor schema: `is_google_login` `defalut` typo fixed to `default: false`

### ❌ Still Present

#### User Schema
- ❌ `role` still has no enum constraint — any string accepted
- ❌ No `timestamps` on User schema
- ❌ `email` still has no `unique: true` — duplicate user emails possible
- ❌ No index on `email` field
- ❌ `google_id` marked `required: true` but non-Google users won't have one — schema conflict

#### Doctor Schema
- ❌ Has **both** `is_active` and `active` boolean fields — still redundant
- ❌ `password` marked `required: true` — Google login doctors won't have a password — schema conflict
- ❌ `google_id` marked `required: true` — same conflict as User
- ❌ Still no index on `google_id` despite `$or` query using it frequently

#### roleModel.ts
- Still dead code — no service creates or manages roles/permissions
- `mongoose.Schema.ObjectId` used instead of `mongoose.Schema.Types.ObjectId` — deprecated form

### DB Connection
- No reconnect logic after disconnect
- Error only `console.log`'d — should `process.exit(1)` on fatal DB failure

### Database Score: **4.5 / 10** *(unchanged)*

---

## 7. 🌐 API DESIGN & REST STANDARDS

### Route Analysis
| Route | Method | Assessment |
|---|---|---|
| `/user/login` | POST | ✅ Correct |
| `/forgot/password` | POST | ✅ Correct |
| `/verfiy/otp` | POST | ⚠️ Typo in URL — `verfiy` not fixed |
| `/new/password` | POST | ⚠️ Vague — should be `/reset/password` |
| `/refresh-token` | POST | ✅ Acceptable |
| `/google/login` | POST | ✅ Correct |
| `/doctor/login` | POST | ✅ Correct |
| `/forgot-doctor/password` | POST | ⚠️ Inconsistent pattern |
| `/verify-doctor/otp` | POST | ⚠️ Mixed kebab/noun style |
| `/reset-doctor/password` | POST | ⚠️ Same inconsistency |
| `/doctor-refresh/token` | POST | ⚠️ Inconsistent with `/refresh-token` for users |
| `/google/doctor/login` | POST | ✅ Acceptable |
| `/admin/login` | POST | ✅ Correct |

### Response Consistency
- ✅ `{ success: bool, message: string, data/token }` used consistently
- ⚠️ `refreshTokenController` still has **no try/catch** — unhandled exceptions crash the process
- ⚠️ `refreshTokenDoctorController` returns `401` but doesn't `return` — execution continues after sending response

### Swagger
- ✅ All routes documented
- ⚠️ Request body schemas still incomplete — only `email` shown for most routes
- ⚠️ Response body schemas not defined
- ⚠️ Swagger server URL still hardcoded to `http://localhost:5001`

### API Design Score: **6.0 / 10** *(unchanged)*

---

## 8. 🔒 SECURITY REVIEW

### ✅ Good Practices (Maintained)
| Practice | Status |
|---|---|
| `helmet()` applied | ✅ |
| `httpOnly: true` on refresh token cookie | ✅ |
| `sameSite: "strict"` on cookie | ✅ |
| bcrypt for password hashing | ✅ |
| bcrypt for OTP before Redis storage | ✅ |
| JWT with separate ACCESS/REFRESH secrets | ✅ (user & admin) |
| Google OAuth: authorization code flow | ✅ |
| Body size limited to `1mb` | ✅ |
| Kafka topics now separated per entity | ✅ **New** |

### 🔴 Critical Security Issues (Remaining or New)
| Issue | Impact | Status |
|---|---|---|
| **No rate limiting** on `/login`, `/forgot/password`, `/verify/otp` | Brute force OTP, credential stuffing | ❌ Not fixed |
| **Reset token stored as global key** `"resetToken"` in user flow | Token collision between concurrent users | ❌ Not fixed |
| **`secure: false`** on refresh token cookie (`loginController.ts:19`) | Cookie sent over HTTP | ❌ Not fixed |
| **No input sanitization** — raw `req.body` to Mongoose | NoSQL injection possible | ❌ Not fixed |
| **Error messages expose internal logic** — "User not found", "Enter your password correctly" | User enumeration | ❌ Not fixed |
| **Doctor refresh token signed with `REFRESH_SECRET_KEY`** instead of `ACCESS_SECRET_KEY` | Doctor access tokens unverifiable | 🔴 **New bug** |
| **`forgotPasswordController` sends `resetToekn: undefined`** in response | Leaks confirmation of email existence with no token | ❌ Not fixed |

### 🟡 Medium Security Issues (Remaining)
| Issue | Impact |
|---|---|
| No refresh token blacklist/rotation | Stolen tokens valid for full duration |
| Admin login has no extra auth factor or IP restriction | Admin as exposed as user |
| `emailConsumerDoctor` has empty catch block — all errors silent | Doctor OTP silent failures in production |
| `dotenv.config()` still called in `loginMiddleware.ts` redundantly | Potential env override side effect |

### Security Score: **3.5 / 10** *(decreased — new doctor access token signing bug)*

---

## 9. ⚡ PERFORMANCE & SCALABILITY

### ✅ Improvements
- Topics separated — user and doctor OTP emails no longer double-fire

### ❌ Remaining Issues

#### Kafka Producer — Fire and Forget
- `emailProducer.ts` and `emailProducerDoctor.ts` both call `connectProducer()` / `connected()` without `await` or error handling
- Kafka unavailability at startup causes silent failure for all subsequent emails

#### DB Query Inefficiency
- `newPasswordService` still: `User.findOne({ email })` + `findByIdAndUpdate` — should be `findOneAndUpdate`
- `doctorLoginServices.ts` case-insensitive regex on unindexed `email` field → **full collection scan O(n) per doctor login**

#### Case-Insensitive Regex Still Present
```typescript
Doctor.findOne({ email: { $regex: new RegExp(`^${email}$`, "i") } })
```
- No index on `Doctor.email` for regex — full scan on every login

#### emailConsumer `fromBeginning: true` Still Not Fixed
- On every service restart, all historical OTP messages re-processed → old emails re-sent

#### `emailConsumer.connect()` Missing `await`
- Race condition: subscribe may run before connection is established

### Performance Score: **5.0 / 10** *(unchanged)*

---

## 10. 🧪 E2E TESTING (auth-service-e2e)

### Assessment
- **Zero change** — test file remains the Nx scaffold placeholder
- Tests a `GET /` route that doesn't exist in the auth service
- No login, OTP, JWT, or Google OAuth tests written
- `auth-service-e2e` is still effectively a dead project

### Testing Score: **1.0 / 10** *(unchanged)*

---

## 11. 📊 FINAL SCORES (OUT OF 10)

| Category | Previous | Current | Delta | Notes |
|---|:---:|:---:|:---:|---|
| **Architecture** | 6.5 | **6.5** | ➡️ | Consumer separation fixed; `fromBeginning` bug still open |
| **Code Quality** | 5.5 | **5.0** | 🔻 | Typos remain; new type mismatch in `forgotPasswordController` |
| **Backend Knowledge** | 6.0 | **6.0** | ➡️ | No new patterns added |
| **Technology Stack** | 8.0 | **8.0** | ➡️ | Kafka topic separation improvement |
| **Logic & Business Logic** | 5.0 | **4.5** | 🔻 | New bugs: doctor refresh uses wrong secret; consumer parse bug |
| **Database & Mongoose** | 4.5 | **4.5** | ➡️ | Minor `required` fix; structural issues remain |
| **API Design & REST** | 6.0 | **6.0** | ➡️ | No changes to routes or Swagger |
| **Security** | 4.0 | **3.5** | 🔻 | New bug: access token signed with refresh secret |
| **Performance** | 5.0 | **5.0** | ➡️ | Topic separation helps; `fromBeginning` still open |
| **E2E Testing** | 1.0 | **1.0** | ➡️ | Zero tests still |

---

### 🏆 OVERALL COMPOSITE SCORE: **4.9 / 10** *(was 5.2)*

```
████████████░░░░░░░░  4.9 / 10
```

> Score decreased slightly due to new bugs introduced — particularly the doctor refresh token being signed with the wrong secret and the doctor email consumer parse bug.

---

## 🎯 PRIORITY FIXES (Updated — Ranked by Impact)

| Priority | Fix | File | Category |
|:---:|---|---|---|
| 1 | Fix doctor refresh token signing: use `ACCESS_SECRET_KEY` not `refreshKey` | `refreshTokenDoctorService.ts:22` | 🔴 Bug |
| 2 | Fix `emailConsumerDoctor` parse: `message.value?.toString()` not `message.toString()` | `emailConsumerDoctor.ts:28` | 🔴 Bug |
| 3 | Scope user reset token to email: `redis.setex(\`resetToken:${email}\`, ...)` | `verifyOtpService.ts:22` | 🔴 Security |
| 4 | Fix `forgotPasswordController`: pass `email` string, not `req.body` object to service | `forgotPasswordController.ts:16` | 🔴 Bug |
| 5 | Fix doctor refresh token TTL: `expiresIn: "1hr"` → `"7d"` | `doctorLoginServices.ts:39` | 🔴 Logic |
| 6 | Fix `emailConsumer`: `fromBeginning: true` → `false` | `emailConsumer.ts:19` | 🔴 Performance |
| 7 | Add `await` to `emailConsumer.ts` `consumer.connect()` call | `emailConsumer.ts:14` | 🟡 Bug |
| 8 | Add rate limiting (`express-rate-limit`) to `/login`, `/forgot`, `/verify/otp` | `routes.ts` | 🔴 Security |
| 9 | Set `secure: true` on refresh token cookie | `loginController.ts:19` | 🔴 Security |
| 10 | Add input sanitization (Joi/Zod) on all request bodies | All controllers | 🔴 Security |
| 11 | Add `unique: true` on `User.email` in schema | `loginModel.ts` | 🟡 Database |
| 12 | Fix `google_id: required: true` — conflicts with non-Google users | `loginModel.ts` | 🟡 Database |
| 13 | Remove redundant `is_active`/`active` fields in Doctor schema | `loginModel.ts` | 🟡 Database |
| 14 | Fix OTP range: `Math.floor(Math.random() * 900000) + 100000` | `forgotPasswordService.ts:21`, `doctorForgotService.ts:8` | 🟡 Logic |
| 15 | Write real E2E tests for all auth flows | `auth-service-e2e` | 🟡 Testing |

# 🗺️ Backend Development Roadmap

## Project Overview
Construction Website Backend API - A Node.js/Express API with Telegram integration for contact form handling and future AI features.

**Repository:** [construction-backend](https://github.com/ojayWillow/construction-backend)

---

## 📊 Progress Tracker

### Overall Progress
- **Phase 1:** ⬜ 0/6 tasks completed (0%)
- **Phase 2:** ⬜ 0/5 tasks completed (0%)
- **Phase 3:** ⬜ 0/4 tasks completed (0%)
- **Phase 4:** ⬜ 0/3 tasks completed (0%)

**Total:** ⬜ 0/18 tasks completed (0%)

---

## 🎯 Phase 1: Project Foundation & Setup
**Goal:** Set up the basic Express.js project structure and configuration

### Tasks:
- [ ] **1.1** Initialize Node.js project (`npm init`)
  - Create `package.json`
  - Set up project metadata
  - Configure Node.js version (18+)

- [ ] **1.2** Install core dependencies
  ```bash
  npm install express cors dotenv helmet express-rate-limit
  npm install -D nodemon
  ```

- [ ] **1.3** Create project folder structure
  ```
  src/
  ├── routes/
  ├── services/
  ├── middleware/
  ├── utils/
  └── app.js
  ```

- [ ] **1.4** Set up environment variables
  - Create `.env` file (from `.env.example`)
  - Configure `PORT`, `TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`
  - Add `.env` to `.gitignore`

- [ ] **1.5** Create basic Express app setup (`src/app.js`)
  - Initialize Express
  - Configure middleware (cors, helmet, json parser)
  - Set up basic error handling

- [ ] **1.6** Add npm scripts to `package.json`
  ```json
  "scripts": {
    "start": "node src/app.js",
    "dev": "nodemon src/app.js"
  }
  ```

**Deliverable:** ✅ Working Express server running on configured port

---

## 🔌 Phase 2: Core API Development
**Goal:** Implement contact form endpoint with validation and security

### Tasks:
- [ ] **2.1** Install validation dependencies
  ```bash
  npm install express-validator
  ```

- [ ] **2.2** Create validation middleware (`src/middleware/validation.js`)
  - Validate name (required, min 2 chars)
  - Validate email (required, valid format)
  - Validate phone (required, valid format)
  - Validate message (required, min 10 chars)

- [ ] **2.3** Create rate limiting middleware (`src/middleware/rateLimit.js`)
  - Limit to 5 requests per 15 minutes per IP
  - Add custom error messages

- [ ] **2.4** Create contact route (`src/routes/contact.js`)
  - POST `/api/contact` endpoint
  - Apply validation middleware
  - Apply rate limiting
  - Handle errors properly

- [ ] **2.5** Test API with Postman/Thunder Client
  - Test successful submission
  - Test validation errors
  - Test rate limiting
  - Document API responses

**Deliverable:** ✅ Functional `/api/contact` endpoint with validation

---

## 📱 Phase 3: Telegram Integration
**Goal:** Send contact form submissions to Telegram

### Tasks:
- [ ] **3.1** Install Telegram dependencies
  ```bash
  npm install node-telegram-bot-api
  ```

- [ ] **3.2** Create Telegram Bot
  - Message @BotFather on Telegram
  - Create new bot and get token
  - Get your chat ID (use @userinfobot)
  - Add credentials to `.env`

- [ ] **3.3** Create Telegram service (`src/services/telegram.js`)
  - Initialize bot with token
  - Create message formatter function
  - Implement `sendMessage()` function
  - Add error handling for failed sends

- [ ] **3.4** Integrate Telegram with contact route
  - Call Telegram service from contact endpoint
  - Format message with user data
  - Return success/error responses
  - Test end-to-end flow

**Deliverable:** ✅ Contact form submissions arrive in Telegram

---

## 🔐 Phase 4: Security, Testing & Deployment
**Goal:** Secure the API and prepare for production

### Tasks:
- [ ] **4.1** Enhance security
  - Configure Helmet.js headers
  - Add CORS whitelist for production
  - Implement request logging (`src/utils/logger.js`)
  - Add input sanitization

- [ ] **4.2** Add comprehensive error handling
  - Global error handler middleware
  - Custom error classes
  - Proper HTTP status codes
  - User-friendly error messages

- [ ] **4.3** Deploy to production
  - Choose platform (Vercel/Railway/Render)
  - Configure environment variables
  - Set up deployment pipeline
  - Test production endpoint

**Deliverable:** ✅ Secure, deployed backend API

---

## 🚀 Phase 5: Future Enhancements (Optional)
**Goal:** Add advanced features

### Planned Features:
- [ ] **5.1** Database integration (Supabase)
  - Store contact submissions
  - Add timestamp and metadata
  - Create admin dashboard queries

- [ ] **5.2** Email notifications
  - SendGrid/Resend integration
  - Email templates
  - Backup notification system

- [ ] **5.3** API documentation
  - Set up Swagger/OpenAPI
  - Document all endpoints
  - Add example requests/responses

- [ ] **5.4** AI Features
  - Chatbot endpoint
  - Cost estimation AI
  - Project analysis

---

## 📝 Notes & Decisions

### Technology Choices
- **Framework:** Express.js (lightweight, flexible)
- **Validation:** express-validator (robust, easy to use)
- **Messaging:** Telegram Bot API (free, reliable)
- **Deployment:** TBD (Vercel/Railway/Render)

### Environment Variables Needed
```env
PORT=3001
TELEGRAM_BOT_TOKEN=your_bot_token_here
TELEGRAM_CHAT_ID=your_chat_id_here
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development
```

---

## 🐛 Known Issues & Blockers
*Document any issues encountered during development*

- None yet

---

## 📅 Timeline Estimate
- **Phase 1:** 2-3 days
- **Phase 2:** 2-3 days
- **Phase 3:** 1-2 days
- **Phase 4:** 2-3 days

**Total:** ~7-11 days for core functionality

---

## 🔗 Related Documentation
- [README.md](./README.md) - Project overview
- [Frontend Roadmap](https://github.com/ojayWillow/construction-frontend/blob/main/ROADMAP.md)
- [API Documentation](./docs/API.md) - Coming soon

---

**Last Updated:** January 18, 2026
**Status:** 🟡 Planning Phase

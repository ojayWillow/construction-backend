# Construction Website - Backend API

## 📋 Projekta apraksts / Project Description

**LV:** Backend API būvniecības uzņēmuma mājaslapai. Nodrošina kontaktu formas apstrādi, Telegram integrāciju un turpmākās AI funkcionalitātes.

**EN:** Backend API for construction company website. Provides contact form handling, Telegram integration, and future AI functionalities.

---

## 🏗️ Tehnoloģiju steks / Tech Stack

- **Runtime:** Node.js (v18+)
- **Framework:** Express.js / Next.js API Routes (ja izmanto monorepo)
- **Database:** Supabase / MongoDB (plānots)
- **API Integration:** Telegram Bot API
- **Deployment:** Vercel / Railway / Render

---

## 📁 Projekta struktūra / Project Structure

```
construction-backend/
├── src/
│   ├── routes/
│   │   └── contact.js          # Kontaktu formas endpoint
│   ├── services/
│   │   ├── telegram.js         # Telegram Bot integrācija
│   │   └── email.js            # Email sūtīšana (optional)
│   ├── middleware/
│   │   ├── validation.js       # Input validācija
│   │   └── rateLimit.js        # Rate limiting
│   ├── utils/
│   │   └── logger.js           # Logging
│   └── app.js                  # Express app setup
├── .env.example                # Environment variables template
├── package.json
└── README.md
```

---

## 🚀 Uzstādīšana / Setup

### 1. Klonē repozitoriju / Clone repository
```bash
git clone https://github.com/ojayWillow/construction-backend.git
cd construction-backend
```

### 2. Instalē atkarības / Install dependencies
```bash
npm install
```

### 3. Konfigurē vides mainīgos / Configure environment variables
```bash
cp .env.example .env
```

Papildini `.env` failu ar saviem datiem:
```env
PORT=3001
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_chat_id
EMAIL_API_KEY=your_email_api_key  # Optional
CORS_ORIGIN=http://localhost:3000  # Frontend URL
```

### 4. Palaid development serveri / Run dev server
```bash
npm run dev
```

---

## 🔌 API Endpoints

### POST `/api/contact`

Sūta kontaktu formas datus uz Telegram.

**Request Body:**
```json
{
  "name": "Jānis Bērziņš",
  "email": "janis@example.com",
  "phone": "+37120000000",
  "message": "Interesē būvniecības pakalpojumi..."
}
```

**Response (Success):**
```json
{
  "success": true,
  "message": "Ziņa veiksmīgi nosūtīta!"
}
```

**Response (Error):**
```json
{
  "success": false,
  "error": "Kļūda nosūtot ziņu"
}
```

---

## 🔐 Drošība / Security

- ✅ Input validācija ar `express-validator`
- ✅ Rate limiting ar `express-rate-limit`
- ✅ CORS konfigurācija
- ✅ Environment variables aizsardzība
- ✅ Helmet.js headers

---

## 📝 Development Tasks (GitHub Issues)

### Fāze 1: Pamata funkcionalitāte
- [ ] Setup Express.js projekta struktūra
- [ ] Izveidot `.env.example` failu
- [ ] Implementēt `/api/contact` endpoint
- [ ] Telegram Bot integrācija
- [ ] Input validācija un error handling
- [ ] Rate limiting middleware

### Fāze 2: Papildu funkcijas
- [ ] Email notification sistēma (optional)
- [ ] Database integrācija (Supabase)
- [ ] Logging sistēma
- [ ] API dokumentācija (Swagger)

### Fāze 3: AI Integrācija (plānots)
- [ ] AI chatbot endpoint
- [ ] Izmaksu aprēķināšanas AI
- [ ] Projektu analīze ar AI

---

## 🧪 Testēšana / Testing

```bash
# Run tests
npm test

# Test coverage
npm run test:coverage
```

---

## 📦 Deployment

### Vercel (ieteicams)
```bash
vercel deploy
```

### Railway
```bash
railway up
```

---

## 🔗 Saites / Links

- **Frontend Repo:** [construction-frontend](https://github.com/ojayWillow/construction-frontend)
- **Live API:** TBD
- **Documentation:** TBD

---

## 👤 Autors / Author

**ojayWillow**
- GitHub: [@ojayWillow](https://github.com/ojayWillow)

---

## 📄 Licence

MIT License

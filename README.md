# KOYA AI — Website

A full multi-page website for the KOYA AI productivity app.

## 📁 File Structure

```
koya/
├── index.html          ← Landing page
├── dashboard.html      ← Main dashboard
├── plan.html           ← Daily plan & tasks
├── progress.html       ← Progress charts
├── chat.html           ← Chat with KOYA AI
├── onboarding.html     ← AI onboarding flow
├── tell.html           ← "About you" form
├── profile.html        ← Avatar/profile setup
├── success.html        ← Welcome/confetti screen
├── signin.html         ← Sign in page
├── schema.sql          ← PostgreSQL database schema
├── css/
│   └── style.css       ← All styles
└── js/
    └── app.js          ← All JavaScript
```

## 🚀 Running Locally (VS Code)

### 1. Open in VS Code
```bash
# Open the koya/ folder in VS Code
code koya/
```

### 2. Install Live Server extension
- Open Extensions (Ctrl+Shift+X)
- Search "Live Server" by Ritwick Dey
- Click Install

### 3. Launch
- Right-click `index.html` → "Open with Live Server"
- Opens at: http://127.0.0.1:5500/index.html

---

## 🗄️ PostgreSQL Setup

### 1. Install PostgreSQL
Download from https://www.postgresql.org/download/

### 2. Create database
```sql
psql -U postgres
CREATE DATABASE koya_db;
\c koya_db
```

### 3. Run schema
```bash
psql -U postgres -d koya_db -f schema.sql
```

### 4. (Optional) Backend with Node.js + Express
```bash
npm init -y
npm install express pg bcrypt jsonwebtoken cors dotenv
```

Create `.env`:
```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=koya_db
JWT_SECRET=your_secret_key
```

---

## 🎨 Pages Overview

| Page | URL | Description |
|------|-----|-------------|
| Landing | index.html | Hero + features + CTA |
| Sign In | signin.html | Login form |
| Onboarding | onboarding.html | 4-step AI chat onboarding |
| About You | tell.html | Name, age, goals form |
| Profile | profile.html | Avatar selection |
| Welcome | success.html | Confetti success screen |
| Dashboard | dashboard.html | Stats, focus card, quick actions |
| Daily Plan | plan.html | Task list with add/complete |
| Progress | progress.html | Charts, weekly summary |
| Chat | chat.html | AI chat interface |

## 🛠️ Tech Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Fonts**: Sora + DM Sans (Google Fonts)
- **Database**: PostgreSQL
- **No dependencies** — runs in any browser

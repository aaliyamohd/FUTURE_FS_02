# Mini CRM — Client Lead Management System

A production-ready full-stack Mini CRM built with the **Matcha & Cream (Organic Modernism)** theme.
Complete authentication (Register → Login → Dashboard), lead CRUD, follow-ups, notes timeline, calendar, search/filters, CSV export, and a responsive UI.

---

## ✨ Features

- **Authentication**
  - Registration page (Full Name, Company, Business Email, Phone, Password, Confirm Password)
  - Strong password validation, duplicate-email prevention, bcrypt hashing
  - Registration does **not** auto-login — user is redirected to Login with a success message
  - JWT-based login, protected routes, logout that blocks browser back-button
- **Dashboard**
  - Summary cards: Total, New, Contacted, Converted, Today's Follow-ups, Upcoming Meetings
  - Recharts bar & pie charts
  - Today's Follow-ups, Upcoming Meetings, Recent Activity timelines
- **Lead Management** (full CRUD)
  - Fields: Name, Company, Email, Phone, Source, Status, Priority, Assigned User, Purpose, Next Follow-up, Preferred Contact Time
  - Sources: Website, LinkedIn, Instagram, Facebook, Referral, Walk-in, Email Campaign, Cold Call, Advertisement, Other
  - Statuses: New, Contacted, Qualified, Proposal Sent, Negotiation, Converted, Lost
  - Priorities: High / Medium / Low
- **Lead Details Page**
  - Inline status/priority/source editing, purpose, follow-up date, preferred contact time
  - Notes timeline (add, edit, delete — newest first)
  - Follow-ups: add, edit, delete, mark completed / missed / rescheduled
- **Calendar** — Day / Week / Month views, clickable events open the lead
- **Search & Filters** — name/company/email/phone, status/priority/source, sort by latest/oldest/name/company
- **CSV Export** — export filtered list on the current page
- **Responsive UI** — sticky sidebar, sticky table header, mobile-friendly, smooth animations

---

## 🧱 Tech Stack

- **Frontend:** React 18 (Vite), Tailwind CSS, React Router, Axios, Recharts, Lucide icons, react-hot-toast, date-fns
- **Backend:** Node.js, Express, MVC (config/controllers/middleware/models/routes/services/utils/validators)
- **Database:** MongoDB + Mongoose
- **Auth:** JWT + bcryptjs
- **Validation:** express-validator (backend) + client-side validation
- **Security:** CORS, express-rate-limit on auth endpoints

---

## 📁 Project Structure

```
mini-crm/
├── backend/
│   ├── config/db.js
│   ├── controllers/     # authController, leadController
│   ├── middleware/      # auth (JWT protect), validate, errorHandler
│   ├── models/          # User, Lead (embedded notes + follow-ups)
│   ├── routes/          # authRoutes, leadRoutes
│   ├── validators/      # authValidator, leadValidator
│   ├── utils/           # generateToken, ApiError
│   ├── seed.js          # default admin + 10 sample leads
│   ├── server.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── api/axios.js
│   │   ├── components/  # AppLayout, Sidebar, Topbar, Modal, ConfirmDialog, LeadForm, StatusBadge, ProtectedRoute
│   │   ├── context/     # AuthContext
│   │   ├── pages/       # Login, Register, Dashboard, Leads, LeadDetails, Calendar, Profile, NotFound
│   │   ├── utils/       # helpers
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── .env.example
├── start-backend.ps1
├── start-frontend.ps1
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB 6+ running locally, or a MongoDB Atlas connection string

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env    # then edit MONGO_URI / JWT_SECRET
npm run seed            # creates default admin + sample leads (optional)
npm run dev             # http://localhost:5000
```

`.env` example:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/mini_crm
JWT_SECRET=change-me-to-a-long-random-string
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
```

Default admin (only if you ran `npm run seed`):

```
Email:    admin@crm.com
Password: Admin@123
```

### 2. Frontend

```bash
cd frontend
npm install
cp .env.example .env    # VITE_API_URL=http://localhost:5000/api
npm run dev             # http://localhost:5173
```

Open `http://localhost:5173`, register a new account, and log in.

### 3. Windows one-click startup

```powershell
# Terminal 1
./start-backend.ps1

# Terminal 2
./start-frontend.ps1
```

Both scripts run `npm install` on first run (if `node_modules` is missing) and copy `.env.example` → `.env` automatically.

---

## 🔌 API Endpoints

All `/api/leads/*` routes require `Authorization: Bearer <token>`.

### Auth

| Method | Endpoint            | Description                             |
|--------|---------------------|-----------------------------------------|
| POST   | /api/auth/register  | Register (does NOT auto-login)          |
| POST   | /api/auth/login     | Login → returns JWT + user              |
| GET    | /api/auth/me        | Get current user                        |
| POST   | /api/auth/logout    | Logout acknowledgement                  |

### Leads

| Method | Endpoint                                  | Description                             |
|--------|-------------------------------------------|-----------------------------------------|
| GET    | /api/leads                                | List (search, filter, sort, paginate)   |
| GET    | /api/leads/summary                        | Dashboard summary                       |
| GET    | /api/leads/calendar?start=&end=           | Calendar events                         |
| GET    | /api/leads/meta/options                   | Sources / statuses / priorities         |
| POST   | /api/leads                                | Create lead                             |
| GET    | /api/leads/:id                            | Get one lead                            |
| PUT    | /api/leads/:id                            | Update lead                             |
| PATCH  | /api/leads/:id/status                     | Update only status                      |
| DELETE | /api/leads/:id                            | Delete lead                             |
| POST   | /api/leads/:id/notes                      | Add note                                |
| PUT    | /api/leads/:id/notes/:noteId              | Edit note                               |
| DELETE | /api/leads/:id/notes/:noteId              | Delete note                             |
| POST   | /api/leads/:id/followups                  | Add follow-up                           |
| PUT    | /api/leads/:id/followups/:followUpId      | Update / reschedule follow-up           |
| DELETE | /api/leads/:id/followups/:followUpId      | Delete follow-up                        |

---

## 🎨 Design — Matcha & Cream

| Purpose       | Color     |
|---------------|-----------|
| Background    | `#FBF9F5` |
| Cards         | `#FFFFFF` |
| Primary text  | `#2B3A2F` |
| Accent        | `#7C9A7B` |
| Borders       | `#E8E4DD` |
| Muted text    | `#7C8178` |

Status badges use the palette specified in the design brief. UI uses Inter font, rounded-2xl corners, thin borders, and soft shadows.

---

## 🛠 Troubleshooting

- **`ECONNREFUSED 127.0.0.1:27017`** — MongoDB is not running. Start Mongo locally or set `MONGO_URI` to an Atlas connection string.
- **CORS errors** — Ensure `CLIENT_URL` in the backend `.env` matches the frontend URL (default `http://localhost:5173`).
- **`Cannot POST /api/auth/register`** — Make sure the backend is running on port `5000` and that `VITE_API_URL` in the frontend `.env` is `http://localhost:5000/api`.
- **401 immediately after login** — Delete `crm_token` from browser `localStorage` and log in again; likely a stale JWT from a previous run.
- **Registration says "email already exists"** — That email is already in the database. Try another email, or drop the `mini_crm` DB with `mongosh` → `use mini_crm; db.dropDatabase()`.

---

## 📄 License

MIT — free to use, modify and distribute.

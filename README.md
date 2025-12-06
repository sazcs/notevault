# NoteVault 📝

A modern, secure note-taking application with real-time search, tagging, and automated workflows.

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based auth with encrypted passwords
- 📝 **Rich Note Taking** - Create, edit, delete notes with tags
- 🔍 **Instant Search** - Real-time search across titles, content, and tags
- 🏷️ **Smart Tagging** - Organize notes with multiple tags
- 📧 **Welcome Emails** - Automated email on signup via n8n
- 📊 **User Analytics** - Auto-log users to Google Sheets
- 🎨 **Modern UI** - Dark theme with responsive design
- ⚡ **Fast & Lightweight** - Optimized performance

## 🛠️ Tech Stack

### Frontend

- **React 19** with TypeScript
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first styling
- **React Router** - Client-side routing
- **Axios** - HTTP client

### Backend

- **Node.js** with **Express.js**
- **TypeScript** - Type safety
- **MongoDB** - Database
- **JWT** - Authentication
- **Zod** - Validation
- **bcryptjs** - Password hashing

### Automation

- **n8n** - Workflow automation
- **Gmail API** - Email sending
- **Google Sheets API** - Data logging

## 📋 Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn
- Google account (for n8n integrations)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/sazcs/notevault.git
cd notevault
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/notevault
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
N8N_WEBHOOK_URL=http://localhost:5678/webhook-test/user-registered
```

Start backend:

```bash
npm run dev
```

### 3. Setup Frontend

```bash
cd client
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:

```bash
npm run dev
```

### 4. Setup n8n (Optional)

```bash
npx n8n
```

Open `http://localhost:5678\` and import the workflow from `n8n-workflow.json`

## 📁 Project Structure

```
notevault/
├── client/ # React frontend
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── context/ # React context (Auth, Notes)
│ │ ├── hooks/ # Custom hooks
│ │ ├── pages/ # Route pages
│ │ ├── types/ # TypeScript types
│ │ └── lib/ # Utilities (API client)
│ └── package.json
│
├── server/ # Express backend
│ ├── src/
│ │ ├── controllers/ # Route handlers
│ │ ├── middleware/ # Express middleware
│ │ ├── models/ # Mongoose models
│ │ ├── routes/ # API routes
│ │ ├── schemas/ # Zod validation
│ │ ├── services/ # Business logic
│ │ ├── utils/ # Helper functions
│ │ └── config/ # Configuration
│ └── package.json
│
└── README.md
```

## 🔌 API Endpoints

### Authentication

```
POST /api/auth/register # Create account
POST /api/auth/login # Sign in
```

### Notes (Protected)

```
GET /api/notes # Get all notes
POST /api/notes # Create note
GET /api/notes/:id # Get single note
PUT /api/notes/:id # Update note
DELETE /api/notes/:id # Delete note
```

## 📦 Building for Production

### Backend

```bash
cd server
npm run build
npm start
```

### Frontend

```bash
cd client
npm run build
```

Build output in `client/dist/`

## 🌐 Deployment

### Backend (VPS/Railway/Render)

1. Set environment variables
2. Install dependencies: `npm install`
3. Build: `npm run build`
4. Start: `npm start`

### Frontend (Vercel/Netlify/VPS)

1. Build: `npm run build`
2. Serve `dist/` folder

### n8n (Self-hosted)

1. Install: `npm install -g n8n`
2. Run: `n8n start`
3. Import workflow JSON

## 🔐 Environment Variables

### Backend Required

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - Secret for JWT signing
- `CLIENT_URL` - Frontend URL (for CORS)

### Backend Optional

- `N8N_WEBHOOK_URL` - n8n webhook endpoint
- `PORT` - Server port (default: 5000)
- `JWT_EXPIRES_IN` - Token expiry (default: 7d)

### Frontend Required

- `VITE_API_URL` - Backend API URL


```markdown
# Jamni App

A modern monorepo application with Next.js frontend and Node.js backend.

## Project Structure

```
Jamni-app/
├── apps/
│   ├── frontend/         # Next.js frontend application
│   └── backend/          # Node.js + Express backend API
├── packages/
│   ├── eslint-config/    # Shared ESLint configurations
│   ├── typescript-config/ # Shared TypeScript configurations
│   └── ui/               # Shared UI components
├── infrastructure/       # Infrastructure as code
├── scripts/              # Utility scripts
└── turbo.json           # Turborepo configuration
```

## Prerequisites

- **Node.js** >= 18.0.0 (v20+ recommended)
- **npm** >= 9.0.0 or **yarn** >= 1.22.0
- **PostgreSQL** (if using database)
- **Git**

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd Jamni-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

#### Backend Environment (.env)

Create `apps/backend/.env`:

```env
# Server Configuration
PORT=8000
NODE_ENV=development

# Frontend URL (CORS)
FRONTEND_URL=http://localhost:3000

# Database (if using Prisma/PostgreSQL)
DATABASE_URL="postgresql://user:password@localhost:5432/jamni_db"

# JWT Secret (for authentication)
JWT_SECRET=your-super-secret-jwt-key-change-this
```

#### Frontend Environment (.env.local)

Create `apps/frontend/.env.local`:

```env
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 4. Database Setup (Optional)

If using Prisma with PostgreSQL:

```bash
cd apps/backend

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev --name init
```

## Running the Application

### Development Mode

Run both frontend and backend simultaneously:

```bash
npm run dev
```

This will start:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8000

### Run Separately

#### Start only the backend:

```bash
npm run dev:backend
# or
cd apps/backend && npm run dev
```

#### Start only the frontend:

```bash
npm run dev:frontend
# or
cd apps/frontend && npm run dev
```

### Production Build

Build both applications:

```bash
npm run build
```

Build individually:

```bash
npm run build:backend
npm run build:frontend
```

### Production Start

```bash
npm run start
```

## Testing the API

Once the backend is running, test the endpoints:

```bash
# Health check
curl http://localhost:8000/api/health

# Get users
curl http://localhost:8000/api/users

# Create user
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

## Available Scripts

### Root Level

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend |
| `npm run dev:frontend` | Start only frontend |
| `npm run dev:backend` | Start only backend |
| `npm run build` | Build both applications |
| `npm run build:frontend` | Build only frontend |
| `npm run build:backend` | Build only backend |
| `npm run start` | Start both in production |
| `npm run lint` | Run linting across all apps |
| `npm run clean` | Clean all build artifacts |

### Backend Only (cd apps/backend)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start with hot reload |
| `npm run build` | Compile TypeScript |
| `npm run start` | Run compiled backend |
| `npm run clean` | Remove dist directory |

### Frontend Only (cd apps/frontend)

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

## Technology Stack

### Frontend
- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: CSS Modules
- **UI Components**: Custom component library

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Validation**: Zod
- **Database**: PostgreSQL with Prisma ORM (optional)
- **Security**: Helmet, CORS

### Monorepo Tools
- **Turborepo**: Build system
- **npm workspaces**: Package management

## Troubleshooting

### Common Issues

#### 1. Backend won't start - "Cannot find module"

```bash
cd apps/backend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### 2. Frontend can't connect to backend

- Ensure backend is running on port 8000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Verify CORS settings in backend `.env`

#### 3. Turborepo errors

Update `turbo.json` to use `tasks` instead of `pipeline`:

```json
{
  "tasks": {
    "dev": { "cache": false, "persistent": true },
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**", ".next/**"] }
  }
}
```

#### 4. Port already in use

Change ports in respective `.env` files:

```env
# Backend .env
PORT=8001

# Frontend .env.local
PORT=3001
```

## Development Workflow

### Adding Dependencies

```bash
# Add to backend
npm install <package> --workspace=@jamni/backend

# Add to frontend
npm install <package> --workspace=web
```

### Running Commands in Specific Workspaces

```bash
# Run dev in backend
npm run dev --workspace=@jamni/backend

# Run lint in frontend
npm run lint --workspace=web
```

## Deployment

### Backend Deployment

```bash
cd apps/backend
npm run build
npm run start
```

For production, consider using:
- **Process Manager**: PM2
- **Container**: Docker
- **Platform**: Heroku, Railway, DigitalOcean, AWS

### Frontend Deployment

```bash
cd apps/frontend
npm run build
npm run start
```

Or deploy to Vercel:

```bash
vercel --prod
```

## License

[Your License Here]

## Support

For issues or questions, please open an issue in the repository.
```

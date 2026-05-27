
```markdown
# Jamni App

A Full Stack Application build on Next.js and Express



## Getting Started

### 1. Clone the Repository

```bash
git clone <https://github.com/isaacrabin/Jamni-app.git>
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

```

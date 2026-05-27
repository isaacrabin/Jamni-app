import { Router, Request, Response } from 'express';
import { z } from 'zod';

const router = Router();

// Zod schema (migrate from your Pydantic models)
const UserSchema = z.object({
  id: z.number().optional(),
  email: z.string().email(),
  name: z.string().min(1),
  age: z.number().min(0).max(150).optional()
});

// GET /api/users
router.get('/', async (req: Request, res: Response) => {
  try {
    // Migrate your FastAPI logic here
    const users = [
      { id: 1, email: 'user@example.com', name: 'John Doe' }
    ];
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST /api/users
router.post('/', async (req: Request, res: Response) => {
  try {
    const validatedData = UserSchema.parse(req.body);
    // Save to database (migrate from SQLAlchemy)
    res.status(201).json(validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.message});
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
});

// GET /api/users/:id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const id = parseInt(Array.isArray(req.params.id) ? req.params.id[0] : req.params.id, 10);
    // Fetch user from database
    res.json({ id, email: 'user@example.com', name: 'John Doe' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

export { router as userRoutes };

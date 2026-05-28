import { Request, Response } from 'express';
// import { prisma } from '../../prisma.config'; // uncomment when ready

export async function getAllUsers(req: Request, res: Response) {
  try {
    // const users = await prisma.user.findMany();
    res.json({ users: [] });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', statusCode: 500 });
  }
}

export async function createUser(req: Request, res: Response) {
  try {
    const data = req.body; // already validated & typed by middleware
    // const user = await prisma.user.create({ data });
    res.status(201).json({ id: 1, ...data, createdAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', statusCode: 500 });
  }
}

export async function getUserById(req: Request, res: Response) {
  try {
    const { id } = req.params; // already coerced to number by validation
    // const user = await prisma.user.findUnique({ where: { id: Number(id) } });
    // if (!user) return res.status(404).json({ error: 'Not Found', statusCode: 404 });
    res.json({ id, name: 'John Doe', email: 'john@example.com', createdAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', statusCode: 500 });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const data = req.body;
    // const user = await prisma.user.update({ where: { id: Number(id) }, data });
    res.json({ id, ...data, createdAt: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', statusCode: 500 });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const { id } = req.params;
    // await prisma.user.delete({ where: { id: Number(id) } });
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error', statusCode: 500 });
  }
}

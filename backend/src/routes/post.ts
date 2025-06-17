// src/routes/post.ts
import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import prisma from '../lib/prisma'; // Adjust path if needed

const router = Router();

// Create a new post
router.post('/create', authMiddleware, async (req: AuthenticatedRequest, res) => {
  const { title, content } = req.body;
  const userId = req.userId as string;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userId,
      },
    });

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

export default router;

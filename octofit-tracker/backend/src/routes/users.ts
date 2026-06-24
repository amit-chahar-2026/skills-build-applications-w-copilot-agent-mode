import { Router } from 'express';
import User from '../models/user.js';

const router = Router();

router.get('/', async (_req, res) => {
  const users = await User.find().populate('team', 'name');
  res.json({ message: 'List users', users });
});

router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({ message: 'Create user', user });
});

export default router;

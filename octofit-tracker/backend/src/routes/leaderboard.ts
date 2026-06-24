import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard.js';

const router = Router();

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .sort({ rank: 1 })
    .populate('user', 'name')
    .populate('team', 'name');
  res.json({ message: 'Leaderboard data', leaderboard });
});

export default router;

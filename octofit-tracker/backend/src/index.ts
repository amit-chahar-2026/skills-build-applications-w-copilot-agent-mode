import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { users, teams, activities, leaderboard, workouts } from './routes/index.js';
import { getApiBaseUrl } from './config.js';

dotenv.config();

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';
const apiBaseUrl = getApiBaseUrl();

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker backend is running.', apiBaseUrl });
});

app.use('/api/users', users);
app.use('/api/teams', teams);
app.use('/api/activities', activities);
app.use('/api/leaderboard', leaderboard);
app.use('/api/workouts', workouts);

mongoose.connect(mongoUri)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server listening on http://localhost:${port}`);
      console.log(`API base URL: ${apiBaseUrl}`);
    });
  })
  .catch((error) => {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  });

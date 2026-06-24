import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import { users, teams, activities, leaderboard, workouts } from './routes/index.js';
import { getApiBaseUrl, MONGODB_URI, SERVER_PORT } from './config/database.js';

const app = express();
const port = SERVER_PORT;
const mongoUri = MONGODB_URI;
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

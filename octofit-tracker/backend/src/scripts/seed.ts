import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/user.js';
import Team from '../models/team.js';
import Activity from '../models/activity.js';
import Workout from '../models/workout.js';
import LeaderboardEntry from '../models/leaderboard.js';

dotenv.config();

// Seed the octofit_db database with test data
const mongoUri = process.env.MONGODB_URI ?? 'mongodb://127.0.0.1:27017/octofit_db';

async function seed() {
  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding:', mongoUri);

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    LeaderboardEntry.deleteMany({})
  ]);

  const teamAlpha = await Team.create({
    name: 'Team Alpha',
    description: 'Competitive team with endurance focus.'
  });

  const teamPulse = await Team.create({
    name: 'Pulse Crew',
    description: 'Community-driven fitness squad.'
  });

  const users = await User.create([
    { name: 'Ava Martinez', email: 'ava.martinez@example.com', role: 'admin', team: teamAlpha._id },
    { name: 'Noah Kim', email: 'noah.kim@example.com', role: 'member', team: teamAlpha._id },
    { name: 'Mia Patel', email: 'mia.patel@example.com', role: 'member', team: teamPulse._id },
    { name: 'Leo Chen', email: 'leo.chen@example.com', role: 'member', team: teamPulse._id }
  ]);

  teamAlpha.members = [users[0]._id, users[1]._id];
  teamPulse.members = [users[2]._id, users[3]._id];
  await teamAlpha.save();
  await teamPulse.save();

  await Activity.create([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 45,
      distanceKm: 9.2,
      caloriesBurned: 520,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    },
    {
      user: users[1]._id,
      type: 'Cycling',
      durationMinutes: 60,
      distanceKm: 24.5,
      caloriesBurned: 640,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      durationMinutes: 40,
      distanceKm: 0,
      caloriesBurned: 210,
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)
    },
    {
      user: users[3]._id,
      type: 'HIIT',
      durationMinutes: 30,
      distanceKm: 0,
      caloriesBurned: 370,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000)
    }
  ]);

  const workouts = await Workout.create([
    {
      title: 'Endurance Sprint',
      description: 'A cardio-focused routine for steady-state conditioning.',
      durationMinutes: 50,
      intensity: 'High'
    },
    {
      title: 'Morning Mobility',
      description: 'Daily stretch and mobility flow to support recovery.',
      durationMinutes: 25,
      intensity: 'Low'
    },
    {
      title: 'Strength Builder',
      description: 'Full body strength circuit with bodyweight and dumbbell exercises.',
      durationMinutes: 45,
      intensity: 'Medium'
    }
  ]);

  await LeaderboardEntry.create([
    { user: users[0]._id, team: teamAlpha._id, score: 1850, rank: 1 },
    { user: users[1]._id, team: teamAlpha._id, score: 1620, rank: 2 },
    { user: users[3]._id, team: teamPulse._id, score: 1480, rank: 3 },
    { user: users[2]._id, team: teamPulse._id, score: 1395, rank: 4 }
  ]);

  console.log('Seed the octofit_db database with test data complete.');
  await mongoose.disconnect();
}

seed().catch((error) => {
  console.error('Seed script failed:', error);
  process.exit(1);
});

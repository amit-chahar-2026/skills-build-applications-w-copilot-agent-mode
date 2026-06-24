import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, default: '' },
  durationMinutes: { type: Number, required: true },
  intensity: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() }
});

export default model('Workout', workoutSchema);

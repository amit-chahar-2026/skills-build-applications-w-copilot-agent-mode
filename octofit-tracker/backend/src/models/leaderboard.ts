import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  score: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true },
  updatedAt: { type: Date, default: () => new Date() }
});

export default model('LeaderboardEntry', leaderboardSchema);

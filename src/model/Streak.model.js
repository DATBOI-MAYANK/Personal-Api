import mongoose from "mongoose";

const StreakSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },
  urgeLevel: {
    type: Number,
    min: 1,
    max: 5,
    default: 1,
  },
});

export const Streak = mongoose.model("Streak",StreakSchema);

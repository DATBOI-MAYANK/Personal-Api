import mongoose from "mongoose";

const RecoverySchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
    unique: true,
  },

  sleep: {
    hoursSlept: {
      type: Number,
      default: 0,
    },
    sleepQualityRating: {
      type: Number,
      min: 1,
      max: 10,
    },
  },

  gym: {
    wentToGym: { type: Boolean, default: false },
    workoutType: { type: String, default: "Rest Day" },
    workoutIntensity: { type: Number, min: 1, max: 10 },
  },

  calculatedRecovery: { type: Number, min: 0, max: 100 },
});

export const Recovery = mongoose.model("Recovery", RecoverySchema);

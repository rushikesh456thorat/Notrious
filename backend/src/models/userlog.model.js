import mongoose from "mongoose";

const usageLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  month: {
    type: String, // Format: "2025-06"
    required: true,
  },
  pagesCreated: {
    type: Number,
    default: 0,
  },
});

usageLogSchema.index({ user: 1, month: 1 }, { unique: true });

const UsageLog = mongoose.model("UsageLog", usageLogSchema);
export default UsageLog;

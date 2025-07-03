import mongoose from "mongoose";
import PageCollection from "./pagecollection.model.js";


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  authProvider: {
    type: String,
    enum: ["local", "google"],
    default: "local"
  },
  googleId: {
    type: String,
    select: false
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  pages: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PageCollection",
    required: true
  },
  shopify: {
    storeUrl: { type: String },
    accessToken: { type: String, select: false },
    isConnected: { type: Boolean, default: false }
  },
  subscription: {
    isActive: { type: Boolean, default: false },
    planName: {
      type: String,
      enum: ["launch", "growth", "scale"],
      default: null
    },
    currentPeriodEnd: { type: Date, default: null },
    billingCycle:{
      type: String,
      enum: ["monthly", "yearly"],
      default: null 
    },
    startDate:{
      type: Date,
      default: null
    },
  }
});


const User = mongoose.model("User", userSchema);
export default User;
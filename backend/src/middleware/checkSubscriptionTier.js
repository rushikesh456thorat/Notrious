import UsageLog from "../models/userlog.model.js";

const PLAN_LIMITS = {
  launch: 50,
  growth: 200,
  scale: 1000,
};

const checkSubscriptionTier = async (req, res, next) => {
  try {
    const user = req.user;

    // Check subscription
    if (
      !user.subscription ||
      !user.subscription.isActive ||
      new Date(user.subscription.endDate) < new Date()
    ) {
      return res.status(403).json({ 
        status:"failed",
        message: "Subscription inactive or expired." });
    }

    const plan = user.subscription.planName;
    const allowedLimit = PLAN_LIMITS[plan];

    // Get current month string (e.g., "2025-06")
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

    // Get or create usage log for the user
    let usage = await UsageLog.findOne({ user: user._id, month: monthKey });

    if (!usage) {
      usage = await UsageLog.create({
        user: user._id,
        month: monthKey,
        pagesCreated: 0,
      });
    }

    if (usage.pagesCreated >= allowedLimit) {
      return res.status(403).json({
        status:"failed",
        message: `Monthly limit (${allowedLimit}) reached for ${plan} plan.`,
      });
    }

    // Store usage object in request if you want to update it later
    req.usage = usage;
    next();
  } catch (error) {
    console.error("checkSubscriptionAccess error:", error.message);
    res.status(500).json({
        status:"failed",
        message: "Internal server error." });
  }
};
export default checkSubscriptionTier;
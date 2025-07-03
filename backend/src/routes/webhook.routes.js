// routes/stripeWebhook.js
import express from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import User from '../models/user.model.js';
import dotenv from 'dotenv'

dotenv.config()

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/stripe', bodyParser.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle successful payments
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const email = session.customer_email;
    const plan = session.metadata.plan;
    const billingCycle = session.metadata.billingCycle;

    try {
      const user = await User.findOne({ email });

      if (user) {
        const periodEnd = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        user.subscription = {
          isActive: true,
          planName: plan,
          currentPeriodEnd: periodEnd,
          billingCycle,
          startDate: new Date(Date.now()),
        };
        await user.save();
        console.log(`Subscription updated for ${email}`);
      }
    } catch (err) {
      console.error("DB update failed:", err.message);
    }
  }

  res.status(200).send();
});

export default router;

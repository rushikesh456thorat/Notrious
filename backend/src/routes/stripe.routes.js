import { Router } from "express";
import protectRoute from '../middleware/protectroute.js';
import Stripe from 'stripe';
import dotenv from 'dotenv'

dotenv.config()
const router = Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const plans = {
  monthly: {
    launch: 99900,
    growth: 299900,
    scale: 799900
  },
  yearly: {
    launch: 840000,
    growth: 3000000,
    scale: 7200000
  }
};

router.post('/create-checkout-session', protectRoute, async (req, res) => {
  const { email, plan, billingCycle } = req.body;


  if (!plans[billingCycle][plan]) return res.status(400).json({ error: "Invalid plan selected." });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [
  {
    price_data: {
      currency: 'inr',
      unit_amount: plans[billingCycle][plan], // e.g., 99900 for ₹999.00
      product_data: {
        name: `${plan} Plan`,
        description: `Subscription for the ${plan} plan with ${billingCycle} billing.`,
        metadata: {
          tier: plan, // launch/growth/scale
          cycle: billingCycle, // monthly/yearly
        }
      }
    },
    quantity: 1
  }
]
,
    mode: 'payment',
    success_url: `${process.env.DOMAIN}/payment/success`,
    cancel_url: `${process.env.DOMAIN}/payment/failed`,
    metadata: { plan, billingCycle }
  });


  res.json({ url: session.url });
})

export default router;
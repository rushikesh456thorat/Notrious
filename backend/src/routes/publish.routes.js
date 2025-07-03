import { Router } from "express";
import shopifyPage from "../controllers/publish/shopifyPage.js"
import protectRoute from "../middleware/protectroute.js";
import checkSubscriptionTier from "../middleware/checkSubscriptionTier.js";



const router = Router()

router.post('/page/shopify',protectRoute,checkSubscriptionTier,shopifyPage )

export default router
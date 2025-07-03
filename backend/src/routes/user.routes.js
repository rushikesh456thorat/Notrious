import { Router } from "express";
import { deletepages } from "../controllers/user/deletepages.js";
import { connectShopify } from "../controllers/user/connectshopify.js";
import { getConnectionStatus } from "../controllers/user/getconnectionstatus.js";
import checkSubscriptionTier from "../middleware/checkSubscriptionTier.js";
import protectRoute from "../middleware/protectroute.js";
import getPagePublishStatus from "../controllers/user/getpagepublishstatus.js";
import { checkSubscription } from "../controllers/user/checksubscription.js";

const router = Router()

router.post('/delete/pages',protectRoute,deletepages)
router.post('/connect/shopify',protectRoute,checkSubscriptionTier,connectShopify)
router.get('/connection/status',protectRoute,getConnectionStatus)
router.get('/subscription/status',protectRoute,checkSubscription)
router.get('/publish-page/status/:publicId',protectRoute,getPagePublishStatus)

export default router
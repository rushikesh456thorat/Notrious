import { Router } from "express";
import pageGenerator from "../controllers/pagegenerator/pagegenerator.js";
import pageCreate from "../controllers/pagegenerator/pagecreate.js";
import updatePageData from "../controllers/pagegenerator/updatepagedata.js";
import AiRewriter from "../controllers/pagegenerator/airewriter.js";
import protectRoute from "../middleware/protectroute.js";
import checkSubscriptionTier from "../middleware/checkSubscriptionTier.js";

const router = Router()


router.post('/page/:id',protectRoute,checkSubscriptionTier,pageGenerator)
router.get('/page/create',protectRoute,checkSubscriptionTier,pageCreate)
router.put('/page/aiagent',protectRoute,checkSubscriptionTier,AiRewriter)
router.post('/page/update/:id',protectRoute,checkSubscriptionTier,updatePageData)



export default router
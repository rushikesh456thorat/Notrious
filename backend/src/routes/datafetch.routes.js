import { Router } from "express";
import pageRetrive from "../controllers/pagegenerator/pageretrive.js";
import protectRoute from "../middleware/protectRoute.js";
import { getPagesTableData } from "../controllers/user/usepagecollection.js";

const router = Router()

router.get('/page/:id',protectRoute,pageRetrive)
router.get('/user/pages',protectRoute,getPagesTableData)


export default router
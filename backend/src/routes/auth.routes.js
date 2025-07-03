import { Router } from "express";
import login from "../controllers/auth/login.js";
import signup from "../controllers/auth/signup.js";
import logout from "../controllers/auth/logout.js";
import { googleAuth } from "../controllers/auth/google.js";

const router = Router()

router.post('/login',
    login
)
router.post('/signup',
    signup
)
router.post('/google',
    googleAuth
)
router.post('/logout',
    logout
)
export default router
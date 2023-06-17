import express from 'express'
import {loginUser, registerUser, updateUser} from "../controllers/authController.js";
import auth from "../middleware/auth.js";
const router = express.Router()

router.route(`/register`).post(registerUser)
router.route(`/login`).post(loginUser)
router.route(`/updateUser`).patch(auth, updateUser)

export default router

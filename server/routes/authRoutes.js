import express from 'express'
import {loginUser, registerUser, updateUser, registeredApplicant} from "../controllers/authController.js";
import auth from "../middleware/auth.js";
const router = express.Router()

router.route(`/registeredApplicant`).get(auth, registeredApplicant)
router.route(`/register`).post(registerUser)
router.route(`/login`).post(loginUser)
router.route(`/updateUser`).patch(auth, updateUser)

export default router

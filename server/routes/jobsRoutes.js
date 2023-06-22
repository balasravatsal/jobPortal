import express from "express";
import {createJob, deleteJob, getAllJobs, showStats, updateJob} from "../controllers/jobController.js";
import auth from "../middleware/auth.js";
const router = express.Router()


router.route(`/`).post(createJob).get(getAllJobs)// will create a job and then redirect to all jobs
router.route(`/stats`).get(auth, showStats)
router.route(`/:id`).delete(deleteJob).patch(auth, updateJob)

export default router

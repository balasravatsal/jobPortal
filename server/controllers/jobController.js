import pool from "../db.js";
import {BadRequestError} from "../errors/index.js";

const createJob = async (req, res) => {
    // console.log(req.body)
    // console.log(localStorage)
    const { company, position, status, jobType, jobLocation} = req.body
    const user_id = req.user.userId
    if (!position || !company) {
        throw new BadRequestError('Please provide all values');
    }
    const createJobQuery = `INSERT INTO "job" (job_id, company, position, status, job_type, job_location, created_at, updated_at, created_by) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $6) RETURNING *;`
    const createJob = await pool.query(createJobQuery, [company, position, status, jobType, jobLocation, user_id])
    res.status(200).json(createJob);
}
const deleteJob = async (req, res) => {

    res.send('delete job')
}
const getAllJobs = async (req, res) => {

    const jobsQuery = `SELECT * FROM "job";`
    const jobs = await pool.query(jobsQuery)
    // console.log(jobs)
    res.status(200).json({jobs: jobs.rows, totalJobs: jobs.rowCount, numOfPages: 1})
}
const updateJob = async (req, res) => {
    res.send('update jobs')
}
const showStats = async (req, res) => {
    res.send('show stats')
}

export {createJob, deleteJob, getAllJobs, updateJob, showStats}
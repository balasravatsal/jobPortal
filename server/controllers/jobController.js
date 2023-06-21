import pool from "../db.js";
import {BadRequestError} from "../errors/index.js";

const createJob = async (req, res) => {
    console.log(req.body)
    // console.log(localStorage)
    const { company, position, status, job_type, job_location} = req.body
    const user_id = req.user.userId
    if (!position || !company) {
        throw new BadRequestError('Please provide all values');
    }
    console.log('hello')
    const createJobQuery = `INSERT INTO public.job (job_id, company, position, status, job_type, job_location, created_at, updated_at, created_by) VALUES (uuid_generate_v4(), $1, $2, $3, $4, $5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, $6) RETURNING *;`
    const createJob = await pool.query(createJobQuery, [company, position, status, job_type, job_location, user_id])

    res.status(200).json(createJob);
}


const deleteJob = async (req, res) => {
    const {id} = req.params
    const user_id = req.user.userId
    // console.log(id, user_id)
    // const checkIfCreated =

    const deleteJobQuery = `DELETE FROM public.job WHERE job_id = $1;`
    await pool.query(deleteJobQuery, [id])
    res.status(200).json({msg: 'Job removed'})
}

const getAllJobs = async (req, res) => {

    const jobsQuery = `SELECT * FROM "job";`
    const jobs = await pool.query(jobsQuery)
    // console.log(jobs)
    res.status(200).json({jobs: jobs.rows, totalJobs: jobs.rowCount, numOfPages: 1})
}
const updateJob = async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    const { company, position, job_type, job_location, status } = req.body
    console.log(req.body)
    // console.log(company)

   const modifyJobQuery = `UPDATE public.job SET company=$1, "position"=$2, status=$3, job_type=$4, job_location=$5, updated_at=CURRENT_TIMESTAMP WHERE job_id=$6;`
   const modifyJob = await pool.query(modifyJobQuery, [company, position, status, job_type, job_location, id])

   return res.json('Successfully updated')
}
const showStats = async (req, res) => {
    res.status(200).send('show stats')
}

export {createJob, deleteJob, getAllJobs, updateJob, showStats}
import pool from "../db.js";
import {BadRequestError} from "../errors/index.js";
import moment from 'moment';

const createJob = async (req, res) => {
    // console.log(req.body)
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
    // console.log(user_id)

    const checkIfCreatedQuery = `SELECT created_by FROM public.job WHERE job_id = $1`
    const checkIfCreated = await pool.query(checkIfCreatedQuery, [id])
    const { created_by } = checkIfCreated.rows[0]

    if(created_by === user_id){
        const deleteJobQuery = `DELETE FROM public.job WHERE job_id = $1;`
        await pool.query(deleteJobQuery, [id])
        res.status(200).json({msg: 'Job removed'})
    }
    else{
        res.status(403).json({msg: 'Forbidden User'})
    }
}

const getAllJobs = async (req, res) => {

    const jobsQuery = `SELECT * FROM "job";`
    const jobs = await pool.query(jobsQuery)
    // console.log(jobs)
    res.status(200).json({jobs: jobs.rows, totalJobs: jobs.rowCount, numOfPages: 1})
}
const updateJob = async (req, res) => {
    const { id } = req.params
    // console.log(req.params)
    const { company, position, job_type, job_location, status } = req.body
    // console.log(req.body)
    // console.log(company)
    // const user_id = req.user.userId
    // console.log(req, '\n\n\n\n\n\n')
    // console.log(user_id)
    const modifyJobQuery = `UPDATE public.job SET company=$1, "position"=$2, status=$3, job_type=$4, job_location=$5, updated_at=CURRENT_TIMESTAMP WHERE job_id=$6;`
    await pool.query(modifyJobQuery, [company, position, status, job_type, job_location, id])

    return res.json('Successfully updated')
}
const showStats = async (req, res) => {
    const user_id = req.user.userId
    const getStatsQuery = `SELECT status, count(*) from "job" WHERE created_by = $1 GROUP BY status;`
    const getStats = await pool.query(getStatsQuery, [user_id])

    const result0 = getStats.rows.reduce((obj, { status, count }) => {
        obj[status] = parseInt(count);
        return obj;
    }, {});

    const finalObject = { stats: result0 };

    const defaultStats = {
        Interview: finalObject.stats.Interview || 0,
        Registration: finalObject.stats.Registration || 0,
        Closed: finalObject.stats.Closed || 0
    }

    const query = `
      SELECT
        EXTRACT(YEAR FROM created_at) AS year,
        EXTRACT(MONTH FROM created_at) AS month,
        COUNT(*) AS count
      FROM
        public.job
      WHERE
        created_by = $1
      GROUP BY
        EXTRACT(YEAR FROM created_at),
        EXTRACT(MONTH FROM created_at)
      ORDER BY
        year DESC,
        month DESC
      LIMIT 6;
    `;

    const result = await pool.query(query, [user_id]);
    // console.log(result.rows)
    const monthlyApplications = result.rows.map((item) => {
        const { year, month, count } = item;
        const date = moment()
            .month(month - 1)
            .year(year)
            .format('MMM Y');
        return { date, count };
    });
    // console.log('kkk')
    const reversedMonthlyApplications = monthlyApplications.reverse();
    // console.log(reversedMonthlyApplications)
    res.status(200).json({defaultStats,  reversedMonthlyApplications})
}

const applyToJob = async (req, res) => {

    const {user_id} = req.body
    const {id: job_id} = req.params
    // console.log(user_id, job_id)

    const alreadyAppliedQuery = `SELECT count(user_id) FROM public.applied_by WHERE job_id = $1 AND applied_by.user_id = $2`
    const alreadyApplied = await pool.query(alreadyAppliedQuery, [job_id, user_id])
    const {count} = alreadyApplied.rows[0]
    // console.log(count)

    if(count >= 1) {
        return res.status(400).json('You have already applied here')
    }
    else {
        const addRelationQuery = `INSERT INTO public.applied_by (job_id, user_id) VALUES ($1, $2);`
        await pool.query(addRelationQuery, [job_id, user_id])
        return res.status(200).json('Your response has been recorded')
    }
}


export {createJob, deleteJob, getAllJobs, updateJob, showStats, applyToJob}

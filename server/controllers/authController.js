import pool from "../db.js";
import {BadRequestError, UnauthenticatedError} from "../errors/index.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import 'express-async-errors';

dotenv.config()

const registerUser = async (req, res) => {
    const {name, email, password, role} = req.body
    if ( !email || !password || !name || !role) {
        throw new BadRequestError ('please provide required details')
    }
    console.log(req.body);
    try {
        const emailAlreadyExistsQuery = `SELECT * FROM "user" WHERE user_email = $1;`;
        const result = await pool.query(emailAlreadyExistsQuery, [email]);

        if (result.rowCount > 0) {
            res.status(500).json("Email already in use");
        } else {
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if (err) throw err;
                const registerUserQuery = `INSERT INTO "user" (user_id, user_email, user_name, password, role) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *;`;
                const registerUser = await pool.query(registerUserQuery, [email, name, hashedPassword, role]);

                // const secretKey = 'secret_key'; // Replace with actual secret key
                const token = jwt.sign({user_id: registerUser.rows[0].user_id},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_LIFETIME});

                // const user = registerUser.rows[0]
                res.status(200).json({
                    user: {
                        user_id: registerUser.rows[0].user_id,
                        email: registerUser.rows[0].user_email,
                        name: registerUser.rows[0].user_name,
                        location: registerUser.rows[0].location,
                        company_name: registerUser.rows[0].company_name,
                        role: registerUser.rows[0].role,
                        token: token,
                    },
                });
            });
        }
    } catch (error) {
        // Handle the error appropriately
        console.error(error);
        throw new Error("An error occurred during user registration.");
    }
};


const loginUser = async (req, res) => {

    const { email, password } = req.body
    if(!email || !password) {
        throw new BadRequestError('Please provide required details')
    }
    const isUserQuery = `SELECT * FROM "user" WHERE user_email = $1`
    const isUser = await pool.query(isUserQuery, [email])
    // console.log(isUser)
    if(isUser.rowCount === 0) {
        throw new UnauthenticatedError('Invalid credentials')
    }
    const user = isUser.rows[0]
    // const secretKey = 'secret_key'; // Replace with actual secret key
    const token = jwt.sign({user_id: user.user_id},
        process.env.JWT_SECRET,
        {expiresIn: process.env.JWT_LIFETIME});

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (isPasswordMatch) {
        // console.log(user);
        res.status(200).json({
            user: {
                user_id: user.user_id,
                email: user.user_email,
                name: user.user_name,
                location: user.location,
                company_name: user.company_name,
                role: user.role,
                resume_link: user.resume_link? user.resume_link: '',
                token: token
            },
        });
    } else {
        console.log('Invalid password');
        throw new UnauthenticatedError('Invalid credentials');
    }
}


const updateUser = async (req, res) => {

    // console.log(req.body)
    // console.log(req.user)
    const {email, name, company, location} = req.body
    const { userId } = req.user
    if (!location || !name || !email || !company ) {
        throw new BadRequestError('Please provide all details')
    }
    const updateUserQuery = `UPDATE "user" SET user_name = $1, user_email = $2, location = $3, company_name = $4 WHERE user_id = $5;`
    await pool.query(updateUserQuery, [name, email, location, company, userId])
    // console.log(updateUser)
    // console.log('authController')
    const thatUser = await pool.query(`SELECT * FROM "user" WHERE user_id = $1;`, [userId])
    res.status(201).json(thatUser.rows[0])
}

const registeredApplicant = async (req, res) => {
    const user_id = req.user.userId
    // console.log(req.body)
    if(req.body.role==='employer') {
        const allRegisteredApplicantQuery =
            `SELECT u.user_id, u.user_email, u.user_name, u.resume_link, j.position
             FROM public."user" u
                      INNER JOIN public.applied_by ab ON u.user_id = ab.user_id
                      INNER JOIN public.job j ON ab.job_id = j.job_id
             WHERE j.created_by = $1;
            `
        // console.log(allRegisteredApplicantQuery)
        const allRegisteredApplicant = await pool.query(allRegisteredApplicantQuery, [user_id])
        const result = allRegisteredApplicant.rows
        return res.status(200).json(result)
    }
    else if (req.body.role === 'employee'){
        const appliedAtJobsQuery = `SELECT * FROM public.job j INNER JOIN public.applied_by ab ON j.job_id = ab.job_id INNER JOIN public.user u ON ab.user_id = u.user_id WHERE u.user_id = $1;`
        const appliedAtJobs = await pool.query(appliedAtJobsQuery, [user_id])
        const result = appliedAtJobs.rows
        return res.status(200).json(result)
    }
}



export {registerUser, loginUser, updateUser, registeredApplicant}


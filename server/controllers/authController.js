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
    console.log(req.body)
    const emailAlreadyExistsQuery = `SELECT * FROM "user" WHERE user_email = $1;`
    await pool.query(emailAlreadyExistsQuery, [email], (error, result) => {
        if(result.rowCount > 0){
            res.status(500).json("Email already in use")
        }
        else {
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if (err) throw err
                const registerUserQuery = `INSERT INTO "user" (user_id, user_email, user_name, password, role) VALUES (uuid_generate_v4(), $1, $2, $3, $4) RETURNING *;`
                const registerUser = await pool.query(registerUserQuery, [email, name, hashedPassword, role])

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
                })
            })
        }
    })
}

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
                token: token,
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
    // console.log(req)
    const {email, name, company, location} = req.body
    const { userId } = req.user
    if (!location || !name || !email || !company) {
        throw new BadRequestError('Please provide all details')
    }
    const updateUserQuery = `UPDATE "user" SET user_name = $1, user_email = $2, location = $3, company_name = $4 WHERE user_id = $5;`
    await pool.query(updateUserQuery, [name, email, location, company, userId])
    // console.log(updateUser)
    // console.log('authController')
    res.send('update user')
}

export {registerUser, loginUser, updateUser}


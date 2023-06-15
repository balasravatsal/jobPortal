import pool from "../db.js";
import {BadRequestError, UnauthenticatedError} from "../errors/index.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv";
import 'express-async-errors';

dotenv.config()

const registerUser = async (req, res) => {
    const {name, email, password} = req.body
    if ( !email || !password || !name ) {
        throw new BadRequestError ('please provide required details')
    }
    const emailAlreadyExistsQuery = `SELECT * FROM "user" WHERE user_email = $1;`
    await pool.query(emailAlreadyExistsQuery, [email], (error, result) => {
        if(result.rowCount > 0){
            res.status(500).json("Email already in use")
        }
        else {
            bcrypt.hash(password, 10, async (err, hashedPassword) => {
                if (err) throw err
                const registerUserQuery = `INSERT INTO "user" (user_id, user_email, user_name, password) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *;`
                const registerUser = await pool.query(registerUserQuery, [email, name, hashedPassword])

                // const secretKey = 'secret_key'; // Replace with actual secret key
                const token = jwt.sign({user_id: registerUser.rows[0].user_id},
                    process.env.JWT_SECRET,
                    {expiresIn: process.env.JWT_LIFETIME});

                // const user = registerUser.rows[0]
                res.status(200).json({
                    user: {
                        email: registerUser.rows[0].user_email,
                        name: registerUser.rows[0].user_name,
                        location: registerUser.rows[0].location,
                        company_name: registerUser.rows[0].company_name,
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
        console.log('Nice password');
        res.status(200).json({
            user: {
                user_id: user.user_id,
                email: user.user_email,
                name: user.user_name,
                location: user.location,
                company_name: user.company_name,
                token: token,
            },
        });
    } else {
        console.log('Invalid password');
        throw new UnauthenticatedError('Invalid credentials');
    }
}


const updateUser = (req, res) => {
    res.send('update user')
}

export {registerUser, loginUser, updateUser}


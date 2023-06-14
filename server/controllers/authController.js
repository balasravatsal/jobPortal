import pool from "../db.js";
import {BadRequestError} from "../errors/index.js";
import bcrypt from 'bcrypt'

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
                res.status(400).json({registerUser})
            })
        }
    })
}

const loginUser = (req, res) => {
    res.send('login user')
}

const updateUser = (req, res) => {
    res.send('update user')
}

export {registerUser, loginUser, updateUser}


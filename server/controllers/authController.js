import pool from "../db.js";

const registerUser = async (req, res) => {
    const user = req.body
    const registerUserQuery = `INSERT INTO "user" (user_id, user_email, user_name, password) VALUES (uuid_generate_v4(), $1, $2, $3) RETURNING *;`
    const registerUser = await pool.query(registerUserQuery, [user.user_email, user.user_name, user.password])
    res.status(201).json({registerUser})

}
const loginUser = (req, res) => {
    res.send('login user')
}

const updateUser = (req, res) => {
    res.send('update user')
}

export {registerUser, loginUser, updateUser}


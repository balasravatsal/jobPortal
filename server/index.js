import "express-async-errors"
import express from 'express'
import dotenv from "dotenv";
import cors from 'cors'
// Connection with db
import pool from './db.js'
// Middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
// routers
import authRoutes from "./routes/authRoutes.js";
import jobsRoutes from "./routes/jobsRoutes.js";

const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())


// Routers
app.get('/', async (req, res) => {
    try {
        const allUserQuery = `SELECT * FROM public.user`
        const allUser = await pool.query(allUserQuery)
        // console.log(allUser.rows)
        res.json(allUser.rows)

    }
    catch (err) {
        console.log(err.message)
    }
})


app.use(`/api/v1/auth`, authRoutes)
app.use(`/api/v1/jobs`, jobsRoutes)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

console.log("hello mister")
app.listen(port, () => {
    console.log(`Server listening on ${port}`)
})

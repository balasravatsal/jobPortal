import dotenv from 'dotenv'
dotenv.config()

// const Pool = require('pg').Pool
import Pool from 'pg'

const pool = new Pool.Pool({

    user: 'node_user',
    password: '1234',
    host: 'localhost',
    port: '5432',
    database: 'jobz'
})

export default pool
//
// import dotenv from 'dotenv'
// dotenv.config()
//
// // const Pool = require('pg').Pool
// import Pool from 'pg'
//
// const pool = new Pool.Pool({
//
//     user: 'node_user',
//     password: '9352',
//     host: 'localhost',
//     port: '5432',
//     database: 'jobz'
// })
//
// export default pool
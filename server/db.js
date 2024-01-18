import dotenv from 'dotenv';
import Pool from 'pg';

dotenv.config();

const pool = new Pool.Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.DBPORT,
    database: process.env.DATABASE

});


console.log("connected");

export default pool
// import dotenv from 'dotenv';
// import pkg from 'pg';

// dotenv.config();

// const pool = new pkg.Pool({
//     user: process.env.USER,
//     password: process.env.PASSWORD,
//     host: process.env.HOST,
//     port: process.env.DBPORT,
//     database: process.env.DATABASE,
//     connectionString: process.env.EXTERNALURL, // Use the external URL provided by Render
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

// pool.connect()
//     .then(() => {
//         console.log('Connected to the database\n');
//     })
//     .catch((error) => {
//         console.error('Error connecting to the database:', error);
//     });

// export default pool;
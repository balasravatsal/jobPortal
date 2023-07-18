import pool from "./db.js";

const createUserTable = async () => {
    try {
        const result = await pool.query(`
CREATE TABLE IF NOT EXISTS "user"
(
    user_id uuid NOT NULL,
    user_email character varying(255) COLLATE pg_catalog."default" NOT NULL,
    user_name character varying(100) COLLATE pg_catalog."default",
    password character varying(200) COLLATE pg_catalog."default" NOT NULL,
    location character varying(100) COLLATE pg_catalog."default",
    company_name character varying(100) COLLATE pg_catalog."default",
    role character varying(50) COLLATE pg_catalog."default",
    resume_link character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT user_pkey PRIMARY KEY (user_id)
);
        `);
        if (result.rowCount > 0) {
            console.log('Table created successfully');
            console.log()
        }
    } catch (error) {
        console.error('Error creating table:', error);
    }
};
// createUserTable();



const createJobTable = async () => {
    try {
        const result = await pool.query(`
CREATE TABLE IF NOT EXISTS job
(
    job_id UUID DEFAULT uuid_generate_v4() NOT NULL,
    company character varying(64) COLLATE pg_catalog."default" NOT NULL,
    "position" character varying(64) COLLATE pg_catalog."default" NOT NULL,
    status character varying(64) COLLATE pg_catalog."default" NOT NULL,
    job_type character varying(64) COLLATE pg_catalog."default" NOT NULL,
    job_location character varying(255) COLLATE pg_catalog."default" NOT NULL DEFAULT 'my city'::character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    created_by uuid NOT NULL,
    CONSTRAINT job_pkey PRIMARY KEY (job_id),
    CONSTRAINT job_created_by_fkey FOREIGN KEY (created_by)
        REFERENCES "user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);
        `);
        if (result.rowCount > 0) {
            console.log('Table created successfully');
            console.log()
        }
    } catch (error) {
        console.error('Error creating table:', error);
    }
};
// createJobTable();


const createAppliedByTable = async () => {
    try {
        const result = await pool.query(`
CREATE TABLE IF NOT EXISTS applied_by
(
    job_id uuid,
    user_id uuid,
    CONSTRAINT applied_by_job_id_fkey FOREIGN KEY (job_id)
        REFERENCES job (job_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT applied_by_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES "user" (user_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)
        `);
        if (result.rowCount > 0) {
            console.log('Table created successfully');
            console.log()
        }
    } catch (error) {
        console.error('Error creating table:', error);
    }
};
// createAppliedByTable();



const insertDummyData = async () => {
    try {
        const client = await pool.connect();

        // Insert dummy data using an SQL statement
        const insertQuery = `
      INSERT INTO "user" (user_id, user_email, user_name, password, location, company_name, role, resume_link)
      VALUES
        ('11111111-1111-1111-1111-111111111111', 'john@example.com', 'John Doe', 'password1', 'Location 1', 'Company A', 'employer', 'https://www.google.com'),
        ('22222222-2222-2222-2222-222222222222', 'jane@example.com', 'Jane Smith', 'password2', 'Location 2', 'Company B', 'employee', 'https://www.google.com')
    `;
        await client.query(insertQuery);

        client.release();
        console.log('Dummy data inserted successfully');
    } catch (error) {
        console.error('Error inserting dummy data:', error);
    }
};
// insertDummyData();




const showAllData = async () => {
    try {
        const client = await pool.connect();

        // Select all rows from the users table
        const selectQuery = `SELECT * FROM "user"`;
        const result = await client.query(selectQuery);

        // Display the retrieved data
        console.log('All data in the users table:');
        console.table(result.rows);

        client.release();
    } catch (error) {
        console.error('Error retrieving data:', error);
    }
};
// showAllData();




// // const deleteTable = async () => {
// //     try {
// //         const client = await pool.connect();
// //
// //         // Delete the users table
// //         const deleteQuery = 'DROP TABLE IF EXISTS "user"';
// //         await client.query(deleteQuery);
// //
// //         client.release();
// //         console.log('Table deleted successfully');
// //     } catch (error) {
// //         console.error('Error deleting table:', error);
// //     }
// // };
// // deleteTable();





const getTableNames = async () => {
    try {
        const client = await pool.connect();

        // Query the pg_tables catalog to fetch table names
        const query = `
      SELECT tablename
      FROM pg_catalog.pg_tables
      WHERE schemaname = 'public';
    `;
        const result = await client.query(query);

        // Extract the table names from the result
        const tableNames = result.rows.map(row => row.tablename);

        // Display the table names
        console.log('Table names:');
        console.log(tableNames);

        client.release();
    } catch (error) {
        console.error('Error retrieving table names:', error);
    }
};
// getTableNames();
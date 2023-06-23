--
-- create table applied_jobs (
--     job_id int FOREIGN KEY REFERENCES job(job_id),
--     emp_id int FOREIGN KEY REFERENCES employee(emp_id)
-- );

ALTER TABLE "user" ADD COLUMN role VARCHAR(50);

-- update "user" set role = 'employer';

select * from "user";

CREATE TABLE applied_by (
  job_id UUID REFERENCES job (job_id),
  user_id UUID REFERENCES "user" (user_id)
);



--   CREATE TABLE job (
--     job_id uuid PRIMARY KEY,
--     company VARCHAR(64) NOT NULL,
--     position VARCHAR(64) NOT NULL,
--     status VARCHAR(64) NOT NULL,
--     job_type VARCHAR(64) NOT NULL,
--     job_location VARCHAR(255) DEFAULT 'my city' NOT NULL,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     created_by UUID NOT NULL,
--     FOREIGN KEY (created_by) REFERENCES "user"(user_id)
--   );


--   CREATE TABLE applied_by (
--   job_id UUID REFERENCES job (job_id),
--   user_id UUID REFERENCES "user" (user_id)
-- );


-- ALTER TABLE "user" ADD COLUMN role VARCHAR(50);


-- update "user" set role = 'employer' where role is null;
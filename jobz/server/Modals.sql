CREATE TABLE user(
    user_id int primary key not null,
    user_email varchar(64) not null,
    username varchar(64) not null,
    password varchar(32) not null,
    location varchar(64) not null
);

create table job(
    job_id int primary key not null,
    job_title varchar(64) not null,
    job_description varchar(256) not null,
    location varchar(64) not null,
    user_id int FOREIGN KEY REFERENCES user(user_id)
);

create table employee (
    emp_id int primary key not null,
    emp_name varchar(64),
    emp_email varchar(64),
    emp_password varchar(64),
--     resume
);

create table applied_jobs (
    job_id int FOREIGN KEY REFERENCES job(job_id),
    emp_id int FOREIGN KEY REFERENCES employee(emp_id)
);

-- id => UUID

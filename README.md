# Next.js Auth App

## Requirements

- Node.js
- PostgreSQL

## Setup

1. Clone the repository:

```bash
git clone https://github.com/Anjali31garg/PILGAMETEST.git
cd nextjs-auth-app

2.Install dependencies:

npm install

3. Set up the PostgreSQL database and update lib/db.js with your credentials.

Run the following SQL command to create the users table:

sql
1. create a database to store data of users.

CREATE DATABASE nextjs_auth_app;


2. create a table inside database

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(100)
);

3 In your Next.js project, you need to set up the database connection in a lib/db.js file. Here is the complete db.js file:

import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'nextjs_auth_app',
  password: 'your_db_password',
  port: 5432,
});

export default pool;
Replace 'your_db_user', 'your_db_password', and 'nextjs_auth_app' with your PostgreSQL user, password, and database name, respectively.


4. Run development  server

npm run dev

5. Open http://localhost:3000 to view the application.



USAGE

. Register a new user at http://localhost:3000/register
.Login at `/login`
.Upon successful login the users name will be displayed
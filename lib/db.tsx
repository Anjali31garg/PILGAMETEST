
import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'nextjs_auth_app',
    password: 'Anjali@31',
    port:5432,
});

export default pool;
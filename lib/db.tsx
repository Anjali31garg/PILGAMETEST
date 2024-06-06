
import { Pool } from 'pg';

const pool = new Pool({
  user: 'your_db_user',
  host: 'localhost',
  database: 'nextjs_auth_app',
  password: 'your_db_password',
  port: 5432,
});
export default pool;
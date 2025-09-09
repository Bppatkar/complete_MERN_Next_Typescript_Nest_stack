import { Pool } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

// create a new pool instance to manage database connections
// --> postgre --> :// -> [user] -> [password] -> @ -> host:port -> [database]
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function query(text, params) {
  const start = Date.now();
  try {
    const result = await pool.query(text, params);

    // execute the time -->
    const duration = Date.now() - start;

    console.log(
      `Executed query: , ${{ text, duration, rows: result.rowCount }}`
    );
    return result;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export default query;

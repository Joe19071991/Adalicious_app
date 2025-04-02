import dotenv from "dotenv";
import pkg from "pg";
const { Pool } = pkg;

dotenv.config();
//connection a la base de donnée
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});
export default pool;

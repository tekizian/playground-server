import { Pool } from "pg";

import config from "../config/index.js";

const pool = new Pool({
  user: config.get("DB_USER"),
  password: config.get("DB_PASS"),
  host: config.get("DB_HOST"),
  database: config.get("DB_NAME"),
  port: config.get("DB_PORT"),
});

export default pool;

import { Pool } from "pg";

import config from "../config/index.js";

const connectionConfiguration = {
  user: config.get("DB_USER"),
  password: config.get("DB_PASS"),
  host: config.get("DB_HOST"),
  database: config.get("DB_NAME"),
  port: config.get("DB_PORT"),
};

const pool = new Pool(connectionConfiguration);

export default pool;

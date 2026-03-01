import pg from "pg";
import { env } from "./env.js";

const { Pool } = pg;

export const pgPool = new Pool({
  host: env.postgres.host,
  port: env.postgres.port,
  user: env.postgres.user,
  password: env.postgres.password,
  database: env.postgres.database,
  ssl: env.postgres.ssl
});


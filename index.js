import "dotenv/config";
import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";

import todo from "./src/todo/index.js";
import pool from "./src/utils/db/index.js";
import runMigrations from "./src/utils/db/migrations/index.js";
const app = express();

const PORT = process.env.PORT || 5000;
const { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL, ALLOWED_HOSTS } = process.env;

const jwtCheck = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: AUTH0_ISSUER_BASE_URL,
  tokenSigningAlg: "RS256",
});
const corsConfig = {
  origin: ALLOWED_HOSTS,
  allowedHeadres: ["Content-Type", "Authorization"],
};

app.use(cors(corsConfig));
app.use(jwtCheck);
app.use(express.json());

app.get("/api/hw", (_req, res) => {
  res.json({ message: "Hello, World!" });
});

app.use("/todo", todo);

pool
  .connect()
  .then(async () => {
    await runMigrations();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to PostgreSQL: `, err);
    process.exit(1);
  });

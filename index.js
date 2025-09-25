import "dotenv/config";
import express from "express";
import cors from "cors";
import { auth } from "express-oauth2-jwt-bearer";
import https from "node:https";

import todo from "./src/todo/index.js";
import pool from "./src/utils/db/index.js";
const app = express();

const PORT = process.env.PORT || 5000;
const { AUTH0_AUDIENCE, AUTH0_ISSUER_BASE_URL, ALLOWED_HOSTS } = process.env;

const jwksUrl = `${AUTH0_ISSUER_BASE_URL}.well-known/jwks.json`;

let jwtCheck;
try {
  console.log(`Checking connectivity to Auth0 JWKS endpoint: ${jwksUrl}`);
  await new Promise((resolve, reject) => {
    https
      .get(jwksUrl, (res) => {
        if (res.statusCode === 200) {
          console.log("Successfully connected to Auth0 JWKS endpoint.");
          resolve(res);
        } else {
          console.error(
            `Failed to connect to Auth0 JWKS endpoint. Status code: ${res.statusCode}`
          );
          console.error("This may be the source of the InvalidRequestError.");
          // Consider adding code to gracefully exit or log more details
          reject(res.statusCode);
        }
      })
      .on("error", (e) => {
        console.error(
          `Error during Auth0 JWKS connectivity test: ${e.message}`
        );
        reject(e);
      });
  });
  console.log("Attempting Auth0 middleware initialization");
  jwtCheck = auth({
    audience: AUTH0_AUDIENCE,
    issuerBaseURL: AUTH0_ISSUER_BASE_URL,
    jwksUri: jwksUrl,
  });
  console.log("Auth0 middleware initialized successfully");
} catch (err) {
  console.error("Auth0 middleware initialization failed");
  console.error(err);
  process.exit(1);
}
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

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  // Log the error and gracefully shut down
  process.exit(1);
});

pool
  .connect()
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(`Error connecting to PostgreSQL: `, err);
    process.exit(1);
  });

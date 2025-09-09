import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { validateHost, ALLOWED_HOSTS } from "./src/utils/host-validator.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

const corsConfig = {
  origin: (origin, cb) => {
    console.info(origin);
    if (!origin || ALLOWED_HOSTS.includes(origin)) {
      cb(null, true);
    } else {
      cb(new Error(`CORS error: HOST ${origin} attempted`));
    }
  },
};

app.use(cors(corsConfig));
app.use(express.json());
app.use(validateHost);

app.get("/api/hw", (_req, res) => {
  res.json({ message: "Hello, World!" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

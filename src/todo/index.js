import express from "express";
import getAllItems from "./items.controller.js";
const router = express.Router();

router.get("/", getAllItems);

export default router;

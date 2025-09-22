import express from "express";
import { getAllItems, addNewItem, updateItem } from "./items.controller.js";
import {
  TodoItemCreateSchema,
  TodoItemUpdateSchema,
} from "../utils/db/models/todo-item.js";
import validateSchema from "../utils/validation.js";
const router = express.Router();

router.get("/", getAllItems);
router.put("/", validateSchema(TodoItemCreateSchema), addNewItem);
router.patch("/:id/", validateSchema(TodoItemUpdateSchema), updateItem);

export default router;

import pool from "../utils/db/index.js";

const getAllItems = async (_req, res, next) => {
  const { rows: todoItems } = await pool.query(`SELECT * FROM todo_items`);
  res.json({
    success: true,
    message: "Working on db connection",
    todoItems,
  });
  next();
};

export default getAllItems;

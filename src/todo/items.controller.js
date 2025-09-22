import pool from "../utils/db/index.js";

export const getAllItems = async (req, res) => {
  const user_id = getUserIdFromReq(req);
  const { rows: todoItems } = await pool.query(
    `SELECT * FROM todo_items WHERE user_id = '${user_id}';`
  );
  res.json({
    success: true,
    message: "Working on db connection",
    todoItems,
  });
};

export const addNewItem = async (req, res) => {
  const user_id = getUserIdFromReq(req);
  const cols = ["user_id"],
    vals = [user_id];
  for (const [col, val] of Object.entries(req.parsed)) {
    cols.push(col);
    vals.push(val);
  }
  try {
    await pool.query(`INSERT INTO todo_items (${cols.join(", ")}) 
        VALUES ('${vals.join("', '")}');`);
    res.json({
      success: true,
    });
  } catch (err) {
    if (err.routine === "_bt_check_unique") {
      res
        .status(409)
        .json({
          success: false,
          message: "An item with that id already exists",
        });
    } else {
      throw err;
    }
  }
};

export const updateItem = async (req, res) => {
  const user_id = getUserIdFromReq(req);
  const { id, ...updates } = req.parsed;
  const updateQuery = formatUpdateQuery(updates);
  const queryString = `UPDATE todo_items SET ${updateQuery} WHERE user_id = '${user_id}' AND id = '${id}'`;
  const results = await pool.query(queryString);
  if (results.rowCount === 0) {
    return res.status(404).json({
      success: false,
      message: `No item found with id: ${id}`,
    });
  }
  res.json({
    success: true,
  });
};

function getUserIdFromReq(req) {
  const { sub: user_id } = req.auth.payload;
  if (!user_id) throw new Error("USER_ID not defined");
  return user_id;
}

function formatUpdateQuery(attrs) {
  const updates = Object.entries(attrs);
  if (updates.length === 0) {
    throw new Error("No params to update found");
  }
  let frags = [];
  for (const [key, val] of Object.entries(attrs)) {
    frags.push(`${key} = '${val}'`);
  }
  return frags.join(", ");
}

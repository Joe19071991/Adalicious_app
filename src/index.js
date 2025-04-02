import express from "express";
import pool from "./db.js";
import { menu } from "./menuRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(menu);

app.get("/order", async (req, res) => {
  const sql = `SELECT * FROM "order"`;
  const result = await pool.query(sql);
  res.json({ result: result.rows });
});

app.get("/order/:id", async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM "order" WHERE id = $1`;
  const result = await pool.query(sql, [id]);
  res.json({ result: result.rows });
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});

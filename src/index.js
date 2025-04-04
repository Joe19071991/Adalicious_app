import express from "express";
import pool from "./db.js";
import { menu } from "./menuRoute.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(menu);

// obtenir toutes les commandes
app.get("/order", async (req, res) => {
  const sql = `SELECT * FROM "order"`;
  const result = await pool.query(sql);
  res.json({ result: result.rows });
});

//obtenir une commande avec son id
app.get("/order/:id", async (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM "order" WHERE id = $1`;
  const result = await pool.query(sql, [id]);
  res.json({ result: result.rows });
});

// création de commande
app.post("/order", async (req, res) => {
  const { plate_id, username } = req.body;
  const sql = `INSERT INTO "order" (plate_id, username) VALUES ($1, $2) RETURNING *`;
  const result = await pool.query(sql, [plate_id, username]);
  res.json({ result: result.rows });
});

app.delete("/order/:id", async (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM "order" WHERE id = $1`;
  const result = await pool.query(sql, [id]);
  res.json({ result: `${result.rows} , la commande à été supprimer` });
});

app.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`);
});

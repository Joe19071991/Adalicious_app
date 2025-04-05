import express from "express";
import pool from "./db.js";

const router = express.Router();

router.get("/menu", async (req, res) => {
  const sql = `SELECT * FROM menu`;
  const result = await pool.query(sql);
  res.json({ result });
});

router.post("/menu", async (req, res) => {
  const { plate, description, image } = req.body;
  //console.log(plate, description, image);

  const sql = `INSERT INTO menu (plate, description, image) VALUES ($1, $2, $3)`;
  const result = await pool.query(sql, [plate, description, image]);
  res.send({ result });
});
export { router as menu };

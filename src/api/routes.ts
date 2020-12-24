import { Router, Request, Response } from "express";
import MySQL from "../config/mysql";
const http = require('http');
require('dotenv').config();
export const router = Router();

router.get('', (req: Request, res: Response) => {

  const query = `SELECT description, make, model, estimatedate, km, id, image FROM ${process.env.DATABASE}.vehicles;`;

  MySQL.executeQuery(query, (err: any, vehicles: Object[]) => {
    if (err) {
      res.status(400).json({
        ok: false,
        error: err
      });
    } else {
      res.json(vehicles);
    }
  });
});

router.get('*', (req: Request, res: Response) => {
  res.status(404).send('Error 404 - Recurso no encontrado.');
});

import e = require('express');
import mysql = require('mysql');

require('dotenv').config();

export default class MySQL {

  private static _instance: MySQL;

  cnn: mysql.Connection;
  conected: boolean = false;

  constructor() {
    console.log('clase inicializada.')

    this.cnn = mysql.createConnection({
      host: process.env.IP,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DATABASE
    });

    this.conectarDB();

  }

  // Singleton pattern
  public static get instance() {
    return this._instance || (this._instance = new this())
  }

  static executeQuery(query: string, callback: Function) {
    this.instance.cnn.query(query, (err, results: Object[], fields) => {
      if (err) {
        console.log('Query error');
        console.log(err);
        return callback(err);
      }

      if (results.length === 0) {
        callback('No records.');
      } else {
        callback(null, results);
      }

    })
  }

  private conectarDB() {
    this.cnn.connect((err: mysql.MysqlError) => {
      if (err) {
        console.log(err.message);
        return;
      }

      this.conected = true;
      console.log('Database online!');
    })
  }
}

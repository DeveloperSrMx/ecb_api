"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
require('dotenv').config();
class MySQL {
    constructor() {
        this.conected = false;
        console.log('clase inicializada.');
        this.cnn = mysql.createConnection({
            host: process.env.IP,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DATABASE
        });
        this.conectarDB();
    }
    // Singleton pattern
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static executeQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Query error');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('No records.');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conected = true;
            console.log('Database online!');
        });
    }
}
exports.default = MySQL;

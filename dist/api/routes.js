"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const mysql_1 = __importDefault(require("../config/mysql"));
const http = require('http');
require('dotenv').config();
exports.router = express_1.Router();
exports.router.get('', (req, res) => {
    const query = `SELECT description, make, model, estimatedate, km, id, image FROM ${process.env.DATABASE}.vehicles;`;
    mysql_1.default.executeQuery(query, (err, vehicles) => {
        if (err) {
            res.status(400).json({
                ok: false,
                error: err
            });
        }
        else {
            res.json(vehicles);
        }
    });
});
exports.router.get('/tmp', (req, res) => {
    const options = {
        host: 'google',
        path: ''
    };
    const request = http.request(options, function (r) {
        let data = '';
        r.on('data', function (chunk) {
            data += chunk;
        });
        r.on('end', function () {
            throw new Error();
        });
        request.on('error', function (e) {
            res.send('err');
        });
        request.end();
    });
});
exports.router.get('*', (req, res) => {
    res.status(404).send('Error 404 - Recurso no encontrado.');
});

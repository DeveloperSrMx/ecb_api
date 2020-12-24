"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./api/server"));
const routes_1 = require("./api/routes");
const helmet = require("helmet");
require('dotenv').config();
const cors_1 = __importDefault(require("cors"));
let compression = require("compression");
const server = server_1.default.init(Number(process.env.HTTP_PORT));
console.log(process.env.HTTP_PORT);
server.app.use(helmet());
server.app.use(compression());
server.app.use(cors_1.default());
server.app.use('/api/vehicles', routes_1.router);
// It's actually not necesary thanks to the singleton pattern.
// MySQL.instance;
server.start(() => {
    console.log('Server running...');
});

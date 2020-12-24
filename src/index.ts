import Server from './api/server';
import { router } from './api/routes';
import MySQL from './config/mysql';
import helmet = require("helmet");
require('dotenv').config();
import cors from "cors";
let compression = require("compression");

const server = Server.init(Number(process.env.HTTP_PORT));
console.log(process.env.HTTP_PORT);
server.app.use(helmet());
server.app.use(compression());
server.app.use(cors());
server.app.use('/api/vehicles', router);

 // It's actually not necesary thanks to the singleton pattern.
 // MySQL.instance;

server.start(() => {
  console.log('Server running...')
})
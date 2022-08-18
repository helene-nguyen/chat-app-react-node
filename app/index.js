//~ Environment
import 'dotenv/config';
//~ Import modules
import express from 'express';
const app = express();

import cors from 'cors';
app.use(cors('*'));

import { server } from './services/socketServer.js';

//~Launch the server
const PORT = process.env.PORT ?? 3000;

server.listen(PORT, () => {
    console.log(`\x1b[1;33m\u2622 Launch server on http://localhost:${PORT} \u2622\x1b[0m`)
});
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import path from "path";

import { router } from "./routes.js";


const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(router);

app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Servidor executando na porta 3000');
});

export { app };

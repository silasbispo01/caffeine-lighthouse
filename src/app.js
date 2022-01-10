import express from "express";

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.on('@user:created', () => {
  console.log('Novo usuário criado!')
})

export { app };
import dotenv from "dotenv";
dotenv.config();

import { app } from "./src/app.js";
import { router } from "./routes.js";

app.use(router);

app.listen(3000, () => {
  console.log('Acessar http://localhost:3000');
  console.log('Servidor executando na porta 3000');
});


export { app };

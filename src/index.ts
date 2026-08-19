import express from "express";
import type { Request, Response, NextFunction } from "express";
import estudiantesRouter from "./routes/estudiantes.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

app.use("/api/estudiantes", estudiantesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get("/", async function (req: Request, res: Response) {
  await res.send("Servidor Vivo!!!");
});

import express from "express";
import type { Request, Response } from "express";
import fs from "node:fs/promises";
import path from "node:path";
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

app.get("/", async function (req: Request, res: Response) {
  await res.send("Servidor Vivo");
});

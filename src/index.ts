import express from "express";
import type { Request, Response, NextFunction } from "express";
import fs from "node:fs/promises";
import path from "node:path";
import { json } from "node:stream/consumers";
const app = express();
const PORT = 3000;

//MIDDLEWARE ENTENDAMOS JSON EN EL BODY
app.use(express.json());

//middaleware para registrar las peticiones QUE SE REALIZAN
app.use(function (req: Request, res: Response, next: NextFunction) {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}

let estudiantes: Estudiante[] = [];

app.get("/estudiantes", async (Req: Request, res: Response) => {
  const lista = await estudiantes;
  res.json(lista);
});

async function cargarDatos() {
  try {
    const ruta = path.resolve("src/estudiantes.json");
    const data = await fs.readFile(ruta, "utf-8");
    estudiantes = JSON.parse(data);
  } catch (error) {
    console.log("no se encontraron a estudiantes o lista vacia");
  }
}

async function obtenerEstudiantes(): Promise<Estudiante[]> {
  const ruta = path.resolve("src/estudiantes.json");
  const text = await fs.readFile(ruta, "utf-8");

  console.log("RUTA:", ruta);
  console.log("CONTENIDO:", JSON.stringify(text));

  return JSON.parse(text);
}
//

app.get("/estudiantes/:id", async (req: Request, res: Response) => {
  const lista = await obtenerEstudiantes();

  const id = Number(req.params.id);

  const estudiante = lista.find((e) => e.id === id);

  if (!estudiante) {
    return res.status(404).json({
      error: "No se encuentra el estudiante",
    });
  }

  res.json(estudiante);
});

//CREATE - CREAR UN NUEVO REGISTRO
app.post("/estudiantes", (req: Request<{}, {}, Estudiante>, res: Response) => {
  const { nombre, email, bootcamp } = req.body;
  if (!nombre || !email || !bootcamp) {
    return res.status(400).json({ error: "Faltan datos que son Obligatorios" });
  }
  const nuevoEstudiante: Estudiante = {
    id: estudiantes.length > 0 ? estudiantes.length + 1 : 1,
    nombre,
    email,
    bootcamp,
  };
  estudiantes.push(nuevoEstudiante);
  res.status(201).json(nuevoEstudiante);
});

interface actualizarEstudiante {
  nombre: string;
  email: string;
  bootcamp: string;
}

//Actualizacion de un registro

app.put("/estudiantes/:id", (req: Request, res: Response) => {
  const idBuscado = Number(req.params.id);
  const index = estudiantes.findIndex((e) => {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res.status(404).json({ error: "estudiante no encontrado" });
  } else {
    const { nombre, email, bootcamp }: actualizarEstudiante = req.body;
    estudiantes[index] = {
      id: idBuscado,
      nombre: nombre ?? estudiantes[index]?.nombre,
      email: email ?? estudiantes[index]?.email,
      bootcamp: bootcamp ?? estudiantes[index]?.bootcamp,
    };
  }

  res.json(estudiantes[index]);
});

//delete- borrar un registro

app.delete("/estudiantes/:id", (req: Request, res: Response) => {
  const idBuscado = Number(req.params.id);
  const index = estudiantes.findIndex((e) => {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "No se puede borrar alguien no encontrado" });
  } else {
    estudiantes = estudiantes.filter((e) => {
      e.id !== idBuscado;
    });
    res.json({ mensaje: "Estudiante Eliminado" });
  }
});

app.get("/", async function (req: Request, res: Response) {
  res.send("Servidor Vivo!!!");
});

app.listen(PORT, async function () {
  await cargarDatos();
  console.log(`servidor corriendo en el puerto : http://localhost:${PORT}`);
});

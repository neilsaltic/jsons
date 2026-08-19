import fs from "node:fs/promises";
import path from "node:path";
import type { Estudiante } from "../types/estudiantes.types.js";

export let listaEstudiantes: Estudiante[] = [];

export async function cargarDatos() {
  try {
    const ruta = path.resolve("src/estudiantes.json");
    const data = await fs.readFile(ruta, "utf-8");
    listaEstudiantes = JSON.parse(data);
    console.log(
      `DATOS CARGADOS EN MEMORIA: ${listaEstudiantes.length} estudiantse cargados`,
    );
  } catch (error) {
    console.log("No se encontraron estudiantes en la lista o lista vacia");
    listaEstudiantes = [];
  }
}

export function setListaEstudiantes(nuevaLista: Estudiante[]) {
  listaEstudiantes = nuevaLista;
}

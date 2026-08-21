interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  bootcamp: string;
}
interface crearEstudiante {
  nombre: string;
  email: string;
  bootcamp: string;
}
interface actualizarEstudiante {
  nombre: string;
  email: string;
  bootcamp: string;
}
interface estudiantesFiltrados {
  nombre?: string;
  email?: string;
  bootcamp?: string;
}

interface idParam {
  id: string;
}

export type {
  Estudiante,
  crearEstudiante,
  actualizarEstudiante,
  estudiantesFiltrados,
  idParam,
};

interface Estudiante {
  id: number;
  name: string;
  email: string;
  bootcamp: string;
}
interface crearEstudiante {
  name: string;
  email: string;
  bootcamp: string;
}
interface actualizarEstudiante {
  name: string;
  email: string;
  bootcamp: string;
}
interface estudiantesFiltrados {
  name?: string;
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

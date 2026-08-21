import { Router } from "express";
import type { Request, Response } from "express";
import {
  listaEstudiantes,
  setListaEstudiantes,
} from "../data/estudiante.data.js";
import type {
  Estudiante,
  crearEstudiante,
  actualizarEstudiante,
  estudiantesFiltrados,
  idParam,
} from "../types/estudiante.types.js";

const router: Router = Router();

router.get(
  "/",
  function (req: Request<{}, {}, {}, estudiantesFiltrados>, res: Response) {
    // #swagger.tags = ['Estudiantes']
    // #swagger.description = 'Obtiene la lista de estudiantes con filtros opcionales'

    /*  #swagger.parameters['email'] = {
            in: 'query',
            description: 'Filtrar por email exacto',
            type: 'string'
    } */
    /*  #swagger.parameters['nombre'] = {
            in: 'query',
            description: 'Filtrar por nombre exacto',
            type: 'string'
    } */
    /*  #swagger.parameters['bootcamp'] = {
            in: 'query',
            description: 'Filtrar por bootcamp',
            type: 'string'
    } */

    const { nombre, email, bootcamp } = req.query;
    let resultado = [...listaEstudiantes];

    //FILTRO por el email mayusculas y minusculas irrelevantes
    if (email) {
      resultado = resultado.filter(
        (e) => e.email.toLowerCase() === email.toLowerCase(),
      );
    }
    //filtro POR EL NOMBRE indiferente a si esta minusculas o mayusculas
    if (nombre) {
      resultado = resultado.filter(
        (e) => e.nombre.toLowerCase() === nombre.toLowerCase(),
      );
    }
    //filtro para el estado activo de mi estudiante
    if (bootcamp) {
      resultado = resultado.filter(
        (e) => e.bootcamp.toLowerCase() === bootcamp.toLowerCase(),
      );
    }

    // mostrar el resultado filtrado
    return res.json({ datos: resultado });
  },
);

//obtener por id
router.get("/:id", function (req: Request<idParam>, res: Response) {
  // #swagger.tags = ['Estudiantes']
  // #swagger.description = 'Obtiene la informacion de un estudiante en especifico por su id'
  /*  #swagger.parameters['id'] = {
          in: 'path',
          description: 'ID del estudiante a buscar',
          required: true,
          type: 'integer'
  } */
  const idBuscado = Number(req.params.id); //Number("juan") === 32

  if (isNaN(idBuscado)) {
    return res
      .status(400)
      .json({ error: "El parametro id debe ser un numero valido" });
  }
  const estudianteFiltrado = listaEstudiantes.find((e) => e.id === idBuscado);

  if (!estudianteFiltrado) {
    return res
      .status(404)
      .json({ error: "no existe un estudiante con ese ID" });
  }
  return res.json(estudianteFiltrado);
});

//Creat estudiante
router.post(
  "/",
  function (req: Request<{}, {}, crearEstudiante>, res: Response) {
    /*
      #swagger.tags = ['Estudiantes']
      #swagger.summary = 'crear un estudiante nuevo'
      #swagger.parameters['body'] = {
        in: 'body',
        description: 'Datos para crear un estudiante nuevo',
        required: true,
        schema: {
          $nombre: "Juan Perez",
          $email: "example@example.com",
          $bootcamp: "Full Stack",
        }
      }
    */
    const { nombre, email, bootcamp } = req.body;
    if (!nombre || !email || !bootcamp) {
      return res.status(400).json({ error: "faltan datos q son obligatorios" });
    }
    const nuevoEstudiante: Estudiante = {
      id: listaEstudiantes.length > 0 ? listaEstudiantes.length + 1 : 1,
      nombre,
      email,
      bootcamp,
    };
    listaEstudiantes.push(nuevoEstudiante);
    res.status(201).json(nuevoEstudiante);
  },
);

//actualizar un Registro

router.put("/:id", function (req: Request, res: Response) {
  /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'actualizar un estudiante existente'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del estudiante a actualizar',
      required: true,
      type: 'integer'
    }
    #swagger.parameters['body'] = {
      in: 'body',
      description: 'Datos a actualizar del estudiante',
      required: true,
      schema: {
        nombre: "Juan Perez",
        email: "example@example.com",
        bootcamp: "Frontend",
      }
    }
  */
  const idBuscado = Number(req.params.id);
  const index = listaEstudiantes.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res.status(404).json({ error: "estudiante no encontrado >:c" });
  } else {
    const { nombre, email, bootcamp }: actualizarEstudiante = req.body;
    // actualizando la informacion del usuario
    listaEstudiantes[index] = {
      id: idBuscado,
      nombre: nombre ?? listaEstudiantes[index]?.nombre,
      email: email ?? listaEstudiantes[index]?.email,
      bootcamp: bootcamp ?? listaEstudiantes[index]?.bootcamp,
    };
    res.json(listaEstudiantes[index]);
  }
});

// Eliminacion de un registro
router.delete("/:id", function (req: Request, res: Response) {
  /*
    #swagger.tags = ['Estudiantes']
    #swagger.summary = 'eliminar un estudiante'
    #swagger.parameters['id'] = {
      in: 'path',
      description: 'ID del estudiante a eliminar',
      required: true,
      type: 'integer'
    }
  */
  const idBuscado = Number(req.params.id);
  const index = listaEstudiantes.findIndex(function (e) {
    return e.id === idBuscado;
  });
  if (index === -1) {
    return res
      .status(404)
      .json({ error: "estudiante no encontrado no podemos eliminarlo" });
  } else {
    let Listanueva = listaEstudiantes.filter((e) => e.id !== idBuscado);
    setListaEstudiantes(Listanueva);
    res.json({ mensaje: "ESTUDIANTE ELIMINADO EXITOSAMENTE" });
  }
});

// las rutas van aquí

export default router;

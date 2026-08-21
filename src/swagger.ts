import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API de Inscripciones Académicas",
    description: "Documentación de la API REST del MP-S2",
    version: "1.0.0",
  },
  host: "localhost:3000",
};

const outputFile = "./swagger_output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc);

import swaggerAutogen from "swagger-autogen";
import dotenv from "dotenv";

dotenv.config();

const doc = {
  swagger: "2.0",
  info: {
    title: "API de Inscripciones Académicas",
    description: "Documentación de la API REST del MP-S2",
    version: "1.0.0",
  },
  host: "7cdt3852-3000.brs.devtunnels.ms",
  basepath: "/",
  schemes: ["https"],
};

const outputFile = "./src/swagger_output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc);

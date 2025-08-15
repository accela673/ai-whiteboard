import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "AI Whiteboard API",
      version: "1.0.0",
      description: "API documentation for AI Whiteboard project"
    },
    servers: [
      {
        url: "http://localhost:5050",
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // пути, где будут описаны эндпоинты
};

const swaggerSpec = swaggerJsdoc(options);

export function setupSwagger(app: Express) {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

import express from 'express';
import { router } from './routes/routes';
import { swaggerSpec } from './utils/swagger';
import swaggerUi from "swagger-ui-express"
export const app = express();

app.use(
  "/api-docs/",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

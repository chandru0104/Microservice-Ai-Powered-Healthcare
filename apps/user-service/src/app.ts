import express from 'express';
import router from './routes/userRoutes';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import compression from "compression"
import dotenv from "dotenv"
import cors from "cors"
import { routerDoctor } from "./routes/doctorRoutes"
dotenv.config()

export const app = express();
app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({ extended: true ,limit:"1mb"}));
app.use(helmet());
app.use(morgan('combined'));
app.use(compression())

app.use(router, routerDoctor);
app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true
}))

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI-healthcare',
      description: 'api user related docs',
      version: '1.0.0',
    },
    servers: [
      {
        url: process.env.USER_SERVICE_PORT,
      },
    ],
  },
  apis: ['apps/user-service/src/routes/userRoutes.ts'],
};

const swaggerOptionsDoctor = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI-healthcare',
      description: 'api user related docs',
      version: '1.0.0',
    },
    servers: [
      {
        url: process.env.USER_SERVICE_PORT,
      },
    ],
  },
  apis: ['apps/user-service/src/routes/doctorRoutes.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions as any);
const swaggerDocsDoctor = swaggerJsdoc(swaggerOptionsDoctor as any);

app.use('/api-doc/user', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api-doc/doctor', swaggerUi.serve, swaggerUi.setup(swaggerDocsDoctor));




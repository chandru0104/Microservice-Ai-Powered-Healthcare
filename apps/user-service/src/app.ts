import express from 'express';
import router from './routes/userRoutes';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

export const app = express();

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'AI-healthcare',
      description: 'api related docs',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:5002',
      },
    ],
  },
  apis: ['apps/user-service/src/routes/userRoutes.ts'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions as any);

app.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(express.json());
app.use(helmet());
app.use(morgan('dev'));

app.use(router);

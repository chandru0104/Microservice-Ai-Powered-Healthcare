import express from 'express';
import { router } from './routes/routes';
import { swaggerSpec } from './utils/swagger';
import swaggerUi from "swagger-ui-express"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import cookieParser from "cookie-parser"
export const app = express();
import {adminRouter} from "./routes/adminRouter"
app.use(
  "/api-docs/auth",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.use(morgan("combined"))
app.use(compression())
app.use(cookieParser())
app.use(router,adminRouter);

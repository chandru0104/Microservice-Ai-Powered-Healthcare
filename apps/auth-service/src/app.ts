import express from 'express';
import { router } from './routes/routes';
import { swaggerSpec } from './utils/swagger';
import swaggerUi from "swagger-ui-express"
import helmet from "helmet"
import morgan from "morgan"
import compression from "compression"
import cookieParser from "cookie-parser"
import cors from "cors"
export const app = express();
import {adminRouter} from "./routes/adminRouter"
app.use(
  "/api-docs/auth",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(express.json({limit:"1mb"}));
app.use(express.urlencoded({ extended: true ,limit:"1mb"}));
app.use(helmet())
app.use(morgan("combined"))
app.use(compression())
app.use(cookieParser())
app.use(cors({
  origin:process.env.ORIGIN as string,
}))
app.use(router,adminRouter);

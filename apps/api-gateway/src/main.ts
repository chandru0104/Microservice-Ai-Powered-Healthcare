import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from "compression"
import morgan from "morgan"
import { limit } from './rateLimit/rate-limiter';
import { authMiddleware } from './authMiddleware/auth';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { Request, Response, NextFunction } from 'express';
import dotenv from "dotenv"
dotenv.config()

const app = express();

app.use(helmet());

app.use(compression())

app.use(morgan("combined"))
app.use(cors({
  origin: [process.env.ORIGIN as string],
  credentials: true
}));

app.use(limit);

const authProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.AUTH_SERVICE_URL as string,
  pathRewrite: {
    '^/api/v1/auth': '',
  },
});

const userProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.USER_SERVICE_URL as string,
  pathRewrite: {
    "^/api/v1/user": ""
  }
});

const doctorProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.USER_SERVICE_URL as string,
  pathRewrite: {
    "^/api/v1/doctor": ""
  }
})


const labProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.LAB_SERVICE_URL as string,
  pathRewrite: {
    "^/api/v1/lab": ""
  }
})


const productProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.PRODUCT_SERVICE_URL,
  pathRewrite: {
    "^/api/v1/product": ""
  }
})

const orderProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.ORDER_SERVICE_URL as string,
  pathRewrite: {
    "^/api/v1/order": ""
  }
})

const paymentProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.PAYMENT_SERVICE_URL as string,
  pathRewrite: {
    "^/api/v1/payment": ""
  }
})

const aiProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.AI_SERVICE_URL as string,
  pathRewrite: {
    "^/api/v1/ai": ""
  }
})

const appointmentProxy = createProxyMiddleware({
  changeOrigin: true,
  target: process.env.APPOINTMENT_SERVICE_URL as string,
  pathRewrite: {
    "^/api/v1/appointment": ""
  }
})

app.use('/api/v1/auth', authProxy);

app.use('/api/v1/user', authMiddleware, userProxy);

app.use("/api/v1/doctor", doctorProxy)

app.use("/api/v1/lab", labProxy)

app.use("/api/v1/product", productProxy)

app.use("/api/v1/order", authMiddleware, orderProxy)

app.use("/api/v1/payment", authMiddleware, paymentProxy)

app.use("/api/v1/ai", authMiddleware, aiProxy)

app.use("/api/v1/appointment", authMiddleware, appointmentProxy)

app.get('/', (req: Request, res: Response) => {
  res.json({
    message: `API gateway running in ${process.env.API_GATEWAY_PORT}`,
  });
});

app.use((error: any, req: Request, res: Response, next: NextFunction) => {
  const statusCode = error.statusCode || 500
  res.status(statusCode).json({
    success: false,
    message: error.message
  })
})

app.listen(process.env.API_GATEWAY_PORT, () => {
  console.log(`API gateway running on ${process.env.API_GATEWAY_PORT}`);
});

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { env } from './config/env';
import { errorHandler, notFound } from './middlewares/error.middleware';

import authRoutes from './modules/auth/auth.routes';
import leadRoutes from './modules/leads/leads.routes';

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());

if (env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

export default app;

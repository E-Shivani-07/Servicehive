import app from './app';
import { env } from './config/env';
import { connectDB } from './config/db';

const startServer = async () => {
  try {
    const port = env.PORT;
    const server = app.listen(port, () => {
      console.log(`🚀 Server running in ${env.NODE_ENV} mode on port ${port}`);
    });

    // Connect to DB in the background (don't block server startup)
    connectDB().catch((error) => {
      console.error('⚠️  Failed to connect to MongoDB:', error.message);
      console.log('📌 Server is still running. Health check endpoint available at /health');
    });

    server.on('error', (error: NodeJS.ErrnoException) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${port} is already in use. Stop the process using that port or set PORT to another free port.`);
        process.exit(1);
      }
      console.error('Server error:', error);
      process.exit(1);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

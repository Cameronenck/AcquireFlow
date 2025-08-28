import App from './app';
import { logger } from './utils/logger';

/**
 * Main server entry point
 */
async function startServer(): Promise<void> {
  try {
    const app = new App();
    
    // Start the server
    await app.start();
    
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}

export default startServer;

const app = require('./index');

const startServer = async () => {
  try {
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`Server started on port ${port}...`);
  } catch (error) {
    console.error('Error starting the server:', error);
    process.exit(1);
  }
};

startServer();
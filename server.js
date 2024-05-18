import express from 'express';
import routes from './routes/index.js';

// Creating the Express app
const app = express();

// Defines port
const PORT = process.env.PORT || 5000;

// Loading routes
app.use('/', routes);

// Starting the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const express = require('express');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

// Use the router instead of passing app directly
const router = require('./routes/index');

app.use('/', router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

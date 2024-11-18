const express = require('express');
const { userRoutes } = require('./routes/userRoutes');
const { messageRoutes } = require('./routes/messageRoutes');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes); // User Service routes
app.use('/messages', messageRoutes); // Message Service routes

// Start the Gateway
app.listen(PORT, () => {
  console.log(`API Gateway running at http://localhost:${PORT}`);
});

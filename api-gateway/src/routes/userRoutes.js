const express = require('express');
const { userClient } = require('../grpcClients');

const router = express.Router();

// Create a User
router.post('/', (req, res) => {
  const { name, email, password } = req.body;

  userClient.CreateUser({ name, email, password }, (err, response) => {
    if (err) {
      console.error('Error creating user:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(response);
  });
});

// Get a User by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  userClient.GetUser({ id }, (err, response) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(response);
  });
});

module.exports = { userRoutes: router };

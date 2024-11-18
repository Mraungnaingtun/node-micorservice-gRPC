const express = require('express');
const { messageClient } = require('../grpcClients');

const router = express.Router();

// Send a Message
router.post('/', (req, res) => {
  const { userId, content } = req.body;

  messageClient.SendMessage({ userId, content }, (err, response) => {
    if (err) {
      console.error('Error sending message:', err);
      return res.status(500).json({ error: err.message });
    }
    res.status(201).json(response);
  });
});


// Get Messages for a User
router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  messageClient.GetMessages({ userId }, (err, response) => {
    if (err) {
      console.error('Error fetching messages:', err);
      return res.status(500).json({ error: err.message });
    }
    res.json(response);
  });
});

module.exports = { messageRoutes: router };

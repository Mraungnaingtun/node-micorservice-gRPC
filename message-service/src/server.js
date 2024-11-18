
const grpc = require('@grpc/grpc-js');
const { messageService, messageProto } = require('./messageService'); // Import the service from messageService.js
const path = require('path');

// Initialize gRPC server
const server = new grpc.Server();

// Add the Message Service to the server
server.addService(messageProto.MessageService.service, messageService);

// Bind the server to a port and start it
server.bindAsync('0.0.0.0:50052', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Message Service running at http://localhost:50052');
  server.start();
});


const grpc = require('@grpc/grpc-js');
const { userService, userProto } = require('./userService'); // Import the user service from userService.js
const path = require('path');

// Initialize the gRPC server
const server = new grpc.Server();

// Add the UserService to the server
server.addService(userProto.UserService.service, userService);

// Bind the server to a port and start it
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('User Service running at http://localhost:50051');
  server.start();
});

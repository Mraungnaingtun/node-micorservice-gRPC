// userService.js

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the proto file for the user service
const PROTO_PATH = path.join(__dirname, '../protos/user.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const userProto = grpc.loadPackageDefinition(packageDefinition).user;

// In-memory storage for users
const users = {};

// Define the User Service
const userService = {
  CreateUser: (call, callback) => {
    const id = Date.now().toString();

    const { name, email, password } = call.request;

    users[id] = { id, name, email, password };
    
    callback(null, { id, name, email });
  },

  GetUser: (call, callback) => {
    const user = users[call.request.id];
    if (!user) {
      return callback(new Error('User not found')); 
    }
    callback(null, user);
  }
};

module.exports = {
  userService,
  userProto
};

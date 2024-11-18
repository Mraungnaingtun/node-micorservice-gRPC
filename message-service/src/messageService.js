
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the proto file
const PROTO_PATH = path.join(__dirname, '../protos/message.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const messageProto = grpc.loadPackageDefinition(packageDefinition).message;

// In-memory storage for messages
const messages = {};

// Define the Message Service
const messageService = {
  SendMessage: (call, callback) => {
    const id = Date.now().toString(); 

    const { userId, content } = call.request;

    messages[userId] = messages[userId] || []; 

    messages[userId].push(content); 
    callback(null, { id, status: 'Message Sent' }); 
  },

  GetMessages: (call, callback) => {
    const userMessages = messages[call.request.userId] || []; 
    callback(null, { messages: userMessages }); 
  }
};

module.exports = {
  messageService,
  messageProto
};

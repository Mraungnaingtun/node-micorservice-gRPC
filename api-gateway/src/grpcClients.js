const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load User Proto
const userProtoPath = path.join(__dirname, '../protos/user.proto');
const userProto = protoLoader.loadSync(userProtoPath, { keepCase: true });
const userPackage = grpc.loadPackageDefinition(userProto).user;
const userClient = new userPackage.UserService('localhost:50051', grpc.credentials.createInsecure());



// Load Message Proto
const messageProtoPath = path.join(__dirname, '../protos/message.proto');
const messageProto = protoLoader.loadSync(messageProtoPath, { keepCase: true });
const messagePackage = grpc.loadPackageDefinition(messageProto).message;
const messageClient = new messagePackage.MessageService('localhost:50052', grpc.credentials.createInsecure());

module.exports = { userClient, messageClient };

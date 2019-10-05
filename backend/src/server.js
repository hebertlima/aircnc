const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const socketio = require('socket.io');
const http = require('http');

const { username, password, database } = require('./credentials/mongodb-atlas.json');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0-3nmv8.mongodb.net/${database}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const connectedUsers = {};

io.on('connection', socket => {
    const { user } = socket.handshake.query;
    connectedUsers[user] = socket.id;
});


// middleware
app.use((request, response, next) => {
    request.io = io;
    request.connectedUsers = connectedUsers;
    return next();
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

console.log('server on');
server.listen(3333);
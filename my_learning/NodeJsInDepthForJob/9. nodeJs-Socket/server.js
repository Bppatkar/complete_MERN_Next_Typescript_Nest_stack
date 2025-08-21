// import express from 'express';
// import http from 'http';
// import path from 'path';
// import { Server } from 'socket.io';
// import { fileURLToPath } from 'url';

// const app = express();
// const server = http.createServer(app);
// const io = new Server(server);

// const __fileName = fileURLToPath(import.meta.url);
// const __dirName = path.dirname(__fileName);
// // console.log('directory name', __dirName);

// // serving static file
// const publicPath = path.join(__dirName, 'public', 'index.html');
// // console.log('Public html path', publicPath);

// app.get('/', (req, res) => {
//   res.sendFile(publicPath);
// });

// // wwe have to store new users at some place
// const users = new Set();

// //* socket.emit sends a named event with associated data from client side,
// //* socket.on listens for specific events which sends from client side and executes a function when that event is received
// //* io.emit is for broadcasting the data to the all users
// //? socket refers to an individual client connection, while io refers to the entire Socket.IO server instance or all connected clients.

// // establish socket connection
// io.on('connection', (socket) => {
//   console.log(`a new User : ${socket.id}`);

//   //! handle users when they will join the chat
//   socket.on('join', (userName) => {
//     users.add(userName);
//     socket.userName = userName;

//     //! broadcast to all clients/users that a new user has joined [for broadcast we use io.emit]
//     io.emit('userjoined', userName);

//     //! send the updated user list to all client
//     io.emit('userList', Array.from(users));
//   });

//   //! handle incoming chat message
//   socket.on('chatMessage', (message) => {
//     //broadcast the received message to all connected clients
//     io.emit('chatMessage', message);
//   });

//   //! Handle disconnect
//   socket.on('disconnect', () => {
//     console.log(`User Disconnect : ${socket.userName}`);

//     //! informing everyone that user is left the chat
//     users.forEach((user) => {
//       if (user === socket.userName) {
//         users.delete(user);

//         io.emit('userLeft', user);

//         //! showing all users a updated online users
//         io.emit('userList', Array.from(users));
//       }
//     });
//   });
// });

// const PORT = 9000;
// server.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });

import express from 'express';
import http from 'http';
import path from 'path';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const __fileName = fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

const publicPath = path.join(__dirName, 'public', 'index.html');
// console.log('public path is', publicPath);

app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.sendFile(publicPath);
});

const users = new Set();

io.on('connection', (socket) => {
  console.log(`user is connected with id: ${socket.id}`);

  socket.on('join', (userName) => {
    users.add(userName);
    socket.userName = userName;

    io.emit('userJoined', userName);
    io.emit('userList', Array.from(users));
  });

  socket.on('chatMessage', (message) => {
    io.emit('chatMessage', message);
  });

  socket.on('disconnect', () => {
    console.log(`user disconnected ${socket.userName}`);

    users.forEach((user) => {
      if (user === socket.userName) {
        users.delete(user);
        io.emit('userLeft', socket.userName);
        io.emit('userList', Array.from(users));
      }
    });
  });
});

const PORT = 7111;
server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});

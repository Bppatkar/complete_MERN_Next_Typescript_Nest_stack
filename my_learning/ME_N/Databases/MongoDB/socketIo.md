# WebSockets with Socket.io

## Why?
- Real-time bidirectional communication
- Ideal for chat apps, live updates, gaming
- More efficient than polling

## Implementation

### Installation
```bash
npm install socket.io
```

### Complete Setup
```javascript
const http = require('http');
const socketio = require('socket.io');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: ["https://yourdomain.com"],
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);

  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    io.to(roomId).emit('user-connected', socket.id);
  });

  socket.on('send-message', ({ roomId, message }) => {
    io.to(roomId).emit('receive-message', {
      sender: socket.id,
      message
    });
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Client-Side Implementation
```html
<script src="/socket.io/socket.io.js"></script>
<script>
  const socket = io('https://yourdomain.com', {
    transports: ['websocket']
  });

  socket.emit('join-room', 'room123');

  document.getElementById('send-btn').addEventListener('click', () => {
    socket.emit('send-message', {
      roomId: 'room123',
      message: 'Hello world!'
    });
  });

  socket.on('receive-message', (data) => {
    console.log('New message:', data);
  });
</script>
```

## Scaling Considerations

### Redis Adapter for Multiple Servers
```bash
npm install socket.io-redis
```

```javascript
const redisAdapter = require('socket.io-redis');
io.adapter(redisAdapter({ host: 'redis-host', port: 6379 }));
```

## Security Considerations

### HTTPS for WebSockets

```javascript
const http = require('http');
const https = require('https');
const socketio = require('socket.io');

const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

const httpSocket = socketio(httpServer);


httpSocket.on('connection', (socket) => {
  // ...
});

const httpsSocket = socketio(httpsServer, { transports: ['websocket'] }); // Use 'websocket' transport    

httpsSocket.on('connection', (socket) => {
  // ...
});     
})  
```


const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let activeUsers = 0;

// Static HTML file එක ලබාදීම
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Socket.io හරහා Real-time Online Users ප්‍රමාණය පාලනය
io.on('connection', (socket) => {
    activeUsers++;
    // සියලුම පරිශීලකයන්ට වත්මන් සංඛ්‍යාව යැවීම
    io.emit('updateUserCount', activeUsers);

    socket.on('disconnect', () => {
        activeUsers--;
        io.emit('updateUserCount', activeUsers);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

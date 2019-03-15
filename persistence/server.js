const http = require('http');

const app = require('./src/app');

const PORT = process.env.PORT || 3002;
const httpServer = http.createServer(app);

console.log(`Listening on port ${PORT}`);
httpServer.listen(PORT);

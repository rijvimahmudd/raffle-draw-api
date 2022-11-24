require('dotenv').config();
const http = require('http');
const app = require('./app/app');

const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';
server.listen(PORT, HOST, () => {
  console.log(`Server running on ${HOST} ${PORT}`);
});

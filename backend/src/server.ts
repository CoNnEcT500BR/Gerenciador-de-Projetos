import http from 'http';
import app from './app.js';
import { initSocket } from './socket.js';

const port = Number(process.env.PORT ?? 4000);
const server = http.createServer(app);

initSocket(server);

server.listen(port, () => {
  console.log(`Backend rodando em http://localhost:${port}`);
});

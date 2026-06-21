import { Server as HttpServer } from 'http';
import { Server, Socket } from 'socket.io';

let io: Server;

export function initSocket(server: HttpServer) {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket: Socket) => {
    console.log(`Socket conectado: ${socket.id}`);

    socket.on('joinRoom', (room: string) => {
      socket.join(room);
    });

    socket.on('sendMessage', (message) => {
      const { room, payload } = message;
      io.to(room).emit('receiveMessage', payload);
    });

    socket.on('disconnect', () => {
      console.log(`Socket desconectado: ${socket.id}`);
    });
  });
}

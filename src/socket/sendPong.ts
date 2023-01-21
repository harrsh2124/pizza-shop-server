import { socket } from '../providers/server';

const sendPong = () => {
    if (socket) {
        socket.emit('pong', {
            message: 'Ping pong!!',
        });
    }
};

export default sendPong;

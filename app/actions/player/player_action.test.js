import openSocket from 'socket.io-client';
import { openPlayerSocketConnection, setUsername } from './player_action';

describe('game actions', () => {
    /*
    it('opens a socket connection', () => {
        const socketConnection = openPlayerSocketConnection({});
        const connectionMock = jest.fn();
        expect(socketConnection).toEqual({ type: 'openSocketConnection', payload: connectionMock });
    });*/

    it('sets the username', () => {
        const username = setUsername('Lorenzo');
        expect(username).toEqual({ type: 'setPlayerUsername', payload: 'Lorenzo' });
    });

});
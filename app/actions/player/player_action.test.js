import { openPlayerSocketConnection, setUsername } from './player_action';

describe('game actions', () => {
    
    it('opens a socket connection', () => {
        const socketConnection = openPlayerSocketConnection({});
        const mockConnection;
        jest.mock('socket.io-client', () => mockConnection);
        expect(socketConnection).toEqual({ type: 'openSocketConnection', payload: mockConnection });
    });

    it('sets the username', () => {
        const username = setUsername('Lorenzo');
        expect(username).toEqual({ type: 'setPlayerUsername', payload: 'Lorenzo' });
    });

});
import playerReducers from './game_reducer';

describe('game reducer', () => {

    it('reducer for CHANGE_COLOR_PICKED', () => {

        const initialState = {
            colorPicked: "#000"
        };

        let state = playerReducers(initialState, { type: "selectColor", payload: '#fff' });
        expect(state).toEqual({ colorPicked: '#fff' });
    });

});
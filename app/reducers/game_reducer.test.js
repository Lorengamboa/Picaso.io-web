import playerReducers from './game_reducer';

describe('game reducer', () => {

    const initialState = {
        toolPicked: 'pencil',
        colorPicked: "#000",
        penWidth: "1px"
    };

    it('reducer for CHANGE_COLOR_PICKED', () => {
        let state = playerReducers(null, { type: "selectColor", payload: '#fff' });
        expect(state).toEqual({ colorPicked: '#fff' });
    });

    it('reducer for SELECT_TOOL_PICKED', () => {
        let state = playerReducers(null, { type: "selectTool", payload: 'pencil' });
        expect(state).toEqual({ toolPicked: 'pencil' });
    });

    it('reducer for SELECT_PEN_WIDTH', () => {
        let state = playerReducers(null, { type: "setPenWidth", payload: '2' });
        expect(state).toEqual({ penWidth: '2' });
    });

    it('reducer for default game', () => {
        let state = playerReducers(initialState, {});
        expect(state).toEqual({
            toolPicked: 'pencil',
            colorPicked: "#000",
            penWidth: "1px"
        });
    });


});
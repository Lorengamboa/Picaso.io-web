import { selectTool, setPenWidth, setColorPicked, updateCanvas } from './game_action';

describe('game actions', () => {

    it('update Canvas', () => {
        const newCanvas = updateCanvas({})
        expect(newCanvas).toEqual({ type: 'updateCanvas', payload: {} })
    });

    it('select color', () => {
        const color = setColorPicked('#000')
        expect(color).toEqual({ type: 'selectColor', payload: '#000' })
    });

    it('select tool', () => {
        const tool = selectTool('pencil')
        expect(tool).toEqual({ type: 'selectTool', payload: 'pencil' })
    });

    it('select a pen witdh', () => {
        const penWidth = setPenWidth(2)
        expect(penWidth).toEqual({ type: 'setPenWidth', payload: 2 })
    });

});
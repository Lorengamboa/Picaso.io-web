import React from 'react';
import Tool from './index';
import renderer from 'react-test-renderer';


describe('tool testing', () => {
    it('renders correctly', () => {
        const tree = renderer
            .create(<Tool />)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})

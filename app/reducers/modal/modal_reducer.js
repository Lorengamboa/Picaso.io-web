'use strict';

import * as ACTION from '../../actions/modal/actions';

const initialState = null;

export default function createReducer(state = initialState, action) {
    switch (action.type) {
      case ACTION.MODAL_OPEN:  
        return Object.assign({}, state, {
          username: action.payload
        });
      case ACTION.MODAL_CLOSE:
        return Object.assign({}, state, {
          connection: action.payload
        });
      default:
        return state;
    };
};
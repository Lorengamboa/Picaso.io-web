'use strict';

import { createStore, combineReducers } from 'redux';
import PlayerReducer from '../reducers/player_reducer';
//import thunk from 'redux-thunk';

const reducer = combineReducers({
    PlayerReducer
});

const store = createStore(
    reducer
)
export default store;
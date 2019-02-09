'use strict';

import { combineReducers } from 'redux';
import playerReducer from './player/playerReducer';
import gameReducer from './game/gameReducer';

// all reducers combined into 1!
const rootReducer = combineReducers({
  playerReducer,
  gameReducer,
});

export default rootReducer;

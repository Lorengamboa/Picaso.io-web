'use strict';

import { combineReducers } from 'redux';
import playerReducer from './player/playerReducer';
import gameReducer from './game/gameReducer';
import socketReducer from './socket/socketReducer';

// all reducers combined into 1!
const rootReducer = combineReducers({
  playerReducer,
  gameReducer,
  socketReducer
});

export default rootReducer;

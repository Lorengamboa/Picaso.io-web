'use strict';

import { combineReducers } from 'redux';
import playerReducer from './player/playerReducer';
import gameReducer from './game/gameReducer';
import socketReducer from './socket/socketReducer';
import generalReducer from './general/generalReducer';

// all reducers combined into 1!
const rootReducer = combineReducers({
  playerReducer,
  gameReducer,
  socketReducer,
  generalReducer
});

export default rootReducer;

'use strict';

import { combineReducers } from 'redux';
import PlayerReducer from './player';
import GameReducer from './game';

// all reducers combined into 1!
const rootReducer = combineReducers({
  PlayerReducer,
  GameReducer,
});

export default rootReducer;

'use strict';

import { combineReducers } from 'redux';
import PlayerReducer from './player';
import GameReducer from './game';

const rootReducer = combineReducers({
  PlayerReducer,
  GameReducer
});

export default rootReducer;

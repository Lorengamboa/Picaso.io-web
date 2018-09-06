'use strict';

import { combineReducers } from 'redux';
import PlayerReducer from './player';
import GameReducer from './game';
import ModalReducer from './modal';

const rootReducer = combineReducers({
  PlayerReducer,
  GameReducer,
  ModalReducer
});

export default rootReducer;

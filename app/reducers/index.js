import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import PlayerReducer from './player_reducer';
import GameReducer from './game_reducer';

const rootReducer = combineReducers({
    PlayerReducer,
    GameReducer
});

export default rootReducer;

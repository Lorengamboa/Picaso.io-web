import { combineReducers } from 'redux';
//import { reducer as formReducer } from 'redux-form';
import PlayerReducer from './player_reducer';

const rootReducer = combineReducers({
    player: PlayerReducer
});

export default rootReducer;

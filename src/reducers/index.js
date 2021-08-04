import { combineReducers } from 'redux';
import user from './user'; // reducer para a action de pegar o nome e email do login

const rootReducer = combineReducers({
  user,
});

export default rootReducer;

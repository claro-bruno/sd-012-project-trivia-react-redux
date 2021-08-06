import { combineReducers } from 'redux';
import user from './user'; // reducer para a action de pegar o nome e email do login
import timer from './timer'; // reducer para o timer das perguntas

const rootReducer = combineReducers({
  user,
  timer,
});

export default rootReducer;

import { combineReducers } from 'redux';
import user from './user'; // reducer para a action de pegar o nome e email do login
import score from './score'; // reducer para o timer das perguntas

const rootReducer = combineReducers({
  user,
  score,
});

export default rootReducer;

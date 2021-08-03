import { combineReducers } from 'redux';
import login from './login';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const reducer = combineReducers({ login });

export default reducer;

import { ACTION_LOGIN } from '../actions';

const INITIAL_LOGIN = {};

const reducer = (state = INITIAL_LOGIN, action) => {
  switch (action.type) {
  case ACTION_LOGIN:
    return { ...state, name: action.nome, gravatarEmail: action.email };
  default:
    return state;
  }
};

export default reducer;

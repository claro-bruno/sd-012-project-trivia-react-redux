import { GET_USER_INFO } from './actions/getEmail';

const INITIAL_STATE = { // Estado incial do reducer "player";
  name: '',
  gravatarEmail: '',
};

// primeiro parâmetro do reducer é o estado e o segundo a action;
const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_USER_INFO:
    return {
      ...state,
      name: action.info.name,
      gravatarEmail: action.info.email,
    };
  default:
    return state;
  }
};

export default player;

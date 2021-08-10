import {
  GET_USER_DATA, SCORE_UPDATE, GUESS_UPDATE, PROFILE_PICTURE } from '../actions/types';

const INITIAL_STATE = {
  name: '',
  gravatarEmail: '',
  score: 0,
  assertions: 0,
  profilePicture: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SCORE_UPDATE:
    return {
      ...state,
      score: state.score + action.point,
    };
  case GET_USER_DATA:
    return {
      ...state,
      name: action.name,
      gravatarEmail: action.email,
      score: 0,
      assertions: 0,
      profilePicture: '',
    };
  case GUESS_UPDATE:
    return {
      ...state,
      assertions: state.assertions + action.payload,
    };
  case PROFILE_PICTURE:
    return {
      ...state,
      profilePicture: action.payload,
    };
  default:
    return state;
  }
};

export default player;

import { getToken, getTokenSuccess, getTokenError } from '../actions/index';

const INITIAL_STATE = {
  questions: [],
  error: '',
};

export default function fetchReducers(state = INITIAL_STATE, action) {
  switch (action.type) {
  case getToken:
    return { ...state };
  case getTokenSuccess:
    return { ...state, questions: action.payload };
  case getTokenError:
    return { ...state, error: 'Impossível fazer requisição' };
  default:
    return state;
  }
}

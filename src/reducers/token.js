import { REQUEST_TOKEN, RECEIVED_TOKEN, FAILED_TOKEN } from '../actions';
// ideias baseadas na logica vista no codigo do grupo 31:
// https://github.com/tryber/sd-012-project-trivia-react-redux/pull/104

const INITIAL_STATE = {
  loading: false,
  error: false,
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...state,
      loading: true,
    };
  case RECEIVED_TOKEN:
    return {
      ...state,
      loading: false,
      token: action.tokenData,
    };
  case FAILED_TOKEN:
    return {
      ...state,
      error: true,
    };
  default:
    return state;
  }
};

export default tokenReducer;

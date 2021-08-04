import { REQUEST_TOKEN } from '../actions';
// ideias baseadas na logica vista no codigo do grupo 31:
// https://github.com/tryber/sd-012-project-trivia-react-redux/pull/104

const INITIAL_STATE = {
  response_code: 0,
  response_message: '',
  token: '',
};

const tokenReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_TOKEN:
    return {
      ...action,
    };
  default:
    return state;
  }
};

export default tokenReducer;
import { TOKEN_START, TOKEN_SUCCESS } from '../actions';

const initialState = {
  fetch: false,
  token: '',
};

const tokenReducer = (state = initialState, action) => {
  switch (action.type) {
  case TOKEN_START:
    return {
      ...state,
      fetch: action.payload.fetch,
    };
  case TOKEN_SUCCESS:
    return {
      ...state,
      fetch: action.payload.fetch,
      token: action.payload.token,
    };
  default: return state;
  }
};

export default tokenReducer;

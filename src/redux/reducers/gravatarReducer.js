import {
  GET_API_GRAVATAR,
  GET_API_GRAVATAR_SUCESS,
  GET_API_GRAVATAR_ERROR,
} from '../actions';

const INITIAL_STATE = {
  avatar: '',
  error: null,
  isLoading: false,
};

const gravatarReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case GET_API_GRAVATAR:
    return {
      ...state,
      isLoading: true,
    };

  case GET_API_GRAVATAR_SUCESS:
    return {
      ...state,
      isLoading: false,
      avatar: payload,
    };

  case GET_API_GRAVATAR_ERROR:
    return {
      ...state,
      isLoading: false,
      error: payload,
    };

  default:
    return state;
  }
};

export default gravatarReducer;

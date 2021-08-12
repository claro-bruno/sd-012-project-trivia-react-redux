import { GET_TOKEN_LOADING, GET_TOKEN_SUCCESS, GET_TOKEN_ERROR } from '../action/index';

// const INITIAL_STATE = ({
//   response_code: 0,
//   response_message: '',
//   token: '',
// });

// const token = (state = INITIAL_STATE, action) => {
//   switch (action.type) {
//   case 'TOKEN':
//     return {
//       ...state,
//       ...action,
//     };
//   default:
//     return state;
//   }
// };

const INITIAL_STATE = ({
  token: '',
  loading: false,
});

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_TOKEN_LOADING:
    return {
      ...state,
      loading: true,
    };

  case GET_TOKEN_SUCCESS:
    return {
      ...state,
      token: action.payload.token,
      loading: false,
    };

  case GET_TOKEN_ERROR:
    return {
      ...state,
      token: action.payload.erro,
      loading: false,
    };

  default:
    return state;
  }
};

export default token;

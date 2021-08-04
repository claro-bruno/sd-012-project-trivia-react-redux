const INITIAL_STATE = {
  url: '',
};

const gravatar = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_IMG':
    return { url: action.url, name: action.name };
  default:
    return state;
  }
};

export default gravatar;

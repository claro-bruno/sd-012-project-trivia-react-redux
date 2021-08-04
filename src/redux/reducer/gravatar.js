const INITIAL_STATE = {
  url: 'https://www.seekpng.com/png/full/245-2454602_tanni-chand-default-user-image-png.png',
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

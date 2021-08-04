import { GET_USER_DATA } from './types';

const getUserData = (name, email) => ({
  type: GET_USER_DATA,
  name,
  email,
});

export default getUserData;

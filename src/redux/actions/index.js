import USER_PLAYER from './actionsTypes';

const addPlayerInfo = (loginInfo) => ({
  type: USER_PLAYER,
  loginInfo,
});

export default addPlayerInfo;

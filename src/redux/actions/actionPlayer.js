export const PLAYER = 'PLAYER';
export const RESET_PLAYER = 'RESET_PLAYER';

export const actionPlayer = (name, assertions, score, gravatarEmail) => ({
  type: PLAYER,
  name,
  assertions,
  score,
  gravatarEmail,
});

export const actionResetPlayer = { type: RESET_PLAYER };

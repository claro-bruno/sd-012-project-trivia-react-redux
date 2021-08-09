export const PLAYER = 'PLAYER';

export const actionPlayer = (name, assertions, score, gravatarEmail) => ({
  type: PLAYER,
  name,
  assertions,
  score,
  gravatarEmail,
});

export const NUMBER_THREE = 3;

export const getDifficultyPoints = (questions) => {
  switch (questions[0].difficulty) {
  case 'easy':
    return 1;
  case 'medium':
    return 2;
  case 'hard':
    return NUMBER_THREE;
  default:
    return 1;
  }
};

export const saveScoreLocalStorage = (points, props) => {
  const { score, assertions, name, gravatarEmail } = props;
  const state = {
    player: {
      name,
      assertions: assertions + 1,
      score: score + points,
      gravatarEmail,
    },
  };
  localStorage.setItem('state', JSON.stringify(state));
};

export const setInitialLocalStorage = (props) => {
  const { score, assertions, name, gravatarEmail } = props;
  const storedInfo = {
    player: {
      name,
      assertions,
      score,
      gravatarEmail,
    },
  };
  localStorage.setItem('state', JSON.stringify(storedInfo));
};

export const USER_LOGIN = 'USER_LOGIN';
export const userLogin = ({ email, name }) => ({
  type: USER_LOGIN,
  email,
  name,
});

export const USER_QUESTIONS = 'USER_QUESTIONS';
export const userQuestions = (result) => ({
  type: USER_QUESTIONS,
  result,
});

export const PLAYER_TIMER = 'PLAYER_TIMER';
export const playerTimer = (value) => ({
  type: PLAYER_TIMER,
  value,
});

export const RIGTH_ANSWERS = 'CORRECT_ANSWER';
export const rightAnswers = ({ score, assertions }) => ({
  type: RIGTH_ANSWERS,
  score,
  assertions,
});

export const getToken = async () => {
  const response = await fetch('https://opentdb.com/api_token.php?command=request');
  const token = await response.json();
  return token.token;
};

export const getQuestions = async (token) => {
  const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
  const questions = await response.json();
  return questions.results;
};

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
export function shuffle(array) {
  let currentIndex = array.length; let
    randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex !== 0) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export const difficulties = { hard: 3, medium: 2, easy: 1 };

export function difficultyToPoints(difficulty) {
  switch (difficulty) {
  case 'hard':
    return difficulties.hard;
  case 'medium':
    return difficulties.medium;
  case 'easy':
    return difficulties.easy;
  default: return 0;
  }
}

export const saveScore = (state, action) => ({
  player: {
    name: state.name,
    gravatarEmail: state.email,
    assertions: action.isCorrect
      ? state.assertions + 1
      : state.assertions,
    score: action.isCorrect
      ? state.score + (state.minScore + (action.timer * action.difficulty))
      : state.score,
  },
});

export const setScore = (state, action) => ({
  ...state,
  assertions: action.isCorrect
    ? state.assertions + 1
    : state.assertions,
  score: action.isCorrect
    ? state.score + (state.minScore + (action.timer * action.difficulty))
    : state.score,
});

export const isLastQuestion = (state) => {
  const { questions, currentQuestion } = state;
  return questions.length - 2 === currentQuestion;
};

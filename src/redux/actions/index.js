const tokenURL = 'https://opentdb.com/api_token.php?command=request';
const categoriesURL = 'https://opentdb.com/api_category.php';
const questionsURL = 'https://opentdb.com/api.php?amount=5';
const withTokenURL = '&token=';
const withCategoryURL = '&category=';
const withDifficultyURL = '&difficulty=';
const withTypeURL = '&type=';

export const updateProfile = (name, email) => ({
  type: 'UPDATE_PROFILE',
  email,
  name,
});

const sendRequest = () => ({
  type: 'SEND_REQUEST',
});

const getResponse = (response) => ({
  type: 'GET_RESPONSE',
  response,
});

const getError = (error) => ({
  type: 'GET_ERROR',
  error,
});

export const fetchToken = () => (dispatch) => {
  dispatch(sendRequest());
  fetch(tokenURL)
    .then((response) => response.json())
    .then((json) => dispatch(getResponse(json)))
    .catch((error) => dispatch(getError(error)));
};

const sendQuestionsRequest = () => ({
  type: 'SEND_QUESTIONS_REQUEST',
});

const getQuestions = (response) => ({
  type: 'GET_QUESTIONS',
  response,
});

const getQuestionsError = (error) => ({
  type: 'GET_QUESTIONS_ERROR',
  error,
});

export const fetchQuestions = (token) => (dispatch, state) => {
  dispatch(sendQuestionsRequest());
  fetch(`${questionsURL}${withTokenURL}${token}${withCategoryURL}${state()
    .config.selectedCategory.id}${withDifficultyURL}${state()
    .config.selectedDifficulty.id}${withTypeURL}${state()
    .config.selectedType.id}`)
    .then((response) => response.json())
    .then((json) => dispatch(getQuestions(json)))
    .catch((error) => dispatch(getQuestionsError(error)));
};

export const nextQuestion = () => ({
  type: 'NEXT_QUESTION',
});

export const timerCallbacks = (startTimerCallback, stopTimerCallback) => ({
  type: 'TIMER_CALLBACKS',
  startTimerCallback,
  stopTimerCallback,
});

export const remainingTimeAction = (remainingTime) => ({
  type: 'REMAINING_TIME',
  remainingTime,
});

export const isOutOfTimeAction = () => ({
  type: 'IS_OUT_OF_TIME',
});

export const isQuestionAnsweredAction = () => ({
  type: 'IS_QUESTION_ANSWERED',
});

export const isAnsweringAction = () => ({
  type: 'IS_ANSWERING',
});

export const updateScore = (timer, difficulty, isCorrect) => ({
  type: 'UPDATE_SCORE',
  timer,
  difficulty,
  isCorrect,
});

export const resetScore = () => ({
  type: 'RESET_SCORE',
});

const sendCategoriesRequest = () => ({
  type: 'SEND_CATEGORIES_REQUEST',
});

const getCategories = (response) => ({
  type: 'GET_CATEGORIES',
  response,
});

const getCategoriesError = (error) => ({
  type: 'GET_CATEGORIES_ERROR',
  error,
});

export const fetchCategories = () => (dispatch) => {
  dispatch(sendCategoriesRequest());
  fetch(categoriesURL)
    .then((response) => response.json())
    .then((json) => dispatch(getCategories(json)))
    .catch((error) => dispatch(getCategoriesError(error)));
};

export const updateSelectedConfigs = (selected, configName, configsList) => ({
  type: 'UPDATE_SELECTED_CONFIGS',
  configName,
  configsList,
  selected,
});

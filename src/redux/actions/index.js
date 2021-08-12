import * as types from './actionTypes';

// Página de LOGIN
export const getPlayerInfo = (info) => ({ type: types.GET_PLAYER_INFO, info });

// Bloco de funções auxiliares para os fetch's
const requestCategories = () => ({ type: types.REQUEST_CATEGORIES });

const requestTriviaQuestions = () => ({ type: types.REQUEST_TRIVIA_QUESTIONS });

export const getCategories = (categories) => ({
  type: types.GET_CATEGORIES,
  categories,
});

export const getTriviaQuestions = (questions) => ({
  type: types.GET_TRIVIA_QUESTIONS,
  questions,
});

const getFetchError = (error) => ({ type: types.GET_FETCH_ERROR, error });

// Fetch Categories
export const fetchCategories = async (dispatch) => {
  const URL_CATEGORIES = 'https://opentdb.com/api_category.php';
  try {
    dispatch(requestCategories());
    const response = await fetch(URL_CATEGORIES);
    const { trivia_categories: triviaCategories } = await response.json();
    dispatch(getCategories(triviaCategories));
  } catch (error) {
    dispatch(getFetchError(`Erro em buscar categorias: ${error}`));
  }
};

// Fetch Token
const fetchToken = async (dispatch) => {
  const URL_TOKEN = 'https://opentdb.com/api_token.php?command=request';
  try {
    const response = await fetch(URL_TOKEN);
    const { token } = await response.json();
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    dispatch(getFetchError(`Erro de token: ${error}`));
  }
};

// Fetch Questions
export const fetchQuestions = (config) => async (dispatch) => {
  const { category, difficulty, type } = config;
  const apiMessage = {
    0: (results) => getTriviaQuestions(results),
    1: () => getFetchError('No Results Could not return results.'),
    2: () => getFetchError('Invalid Parameter Contains an invalid parameter.'),
    3: () => getFetchError('Token Not Found Session Token does not exist.'),
    4: () => getFetchError('Token Empty Session.'),
  };
  dispatch(requestTriviaQuestions());
  const token = await fetchToken(dispatch);
  const URL_QUESTIONS = `https://opentdb.com/api.php?amount=5&category=${category}`
  + `&difficulty=${difficulty}&type=${type}&encode=base64&token=${token}`;
  try {
    const response = await fetch(URL_QUESTIONS);
    const { response_code: responseCode, results } = await response.json();
    dispatch(apiMessage[responseCode](results));
  } catch (error) {
    dispatch(getFetchError(`Erro do servidor de perguntas: ${error}`));
  }
};

// Atualiza a pontuação
export const updateScore = (payload) => ({ type: types.UPDATE_SCORE, payload });

// Atualiza a questão
export const updateQuestion = (payload) => ({ type: types.UPDATE_QUESTION, payload });

// Atualiza o tempo de resposta
export const setAnswerTime = (payload) => ({ type: types.SET_ANSWER_TIME, payload });

// Atualiza configuração
export const updateConfig = (config) => ({ type: types.UPDATE_CONFIG, config });

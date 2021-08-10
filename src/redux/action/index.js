import getQuest from '../../Services/getQuest';

export const GET_QUESTION_SUCCESS = 'GET_QUESTION_SUCCESS';
export const GET_QUESTION_ERROR = 'GET_QUESTION_ERROR';

const getQuestionError = (erro) => ({ type: GET_QUESTION_ERROR, payload: erro });

export const getLogin = (value) => ({
  type: 'LOGIN',
  ...value,
});

const getQuestionSuccess = (question) => ({
  type: GET_QUESTION_SUCCESS,
  payload: question,
});

export const getAllQuestions = () => async (dispatch) => {
  try {
    const { results } = await getQuest();
    dispatch(getQuestionSuccess(results));
  } catch (erro) {
    dispatch(getQuestionError(erro));
  }
};

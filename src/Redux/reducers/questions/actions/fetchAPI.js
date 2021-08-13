import getQuestions from './getQuestions';
import getChanges from './getChanges';

const fetchAPI = (amount = '5', category = '', difficulty = '', type = '') => (
  async (dispatch) => {
    const endPoint = new URL('https://opentdb.com/api.php');
    const token = localStorage.getItem('token');
    endPoint.search = new URLSearchParams({
      token: !token ? '' : token,
      encode: 'base64',
      amount,
      category,
      type,
      difficulty,
    });
    const fetching = await fetch(endPoint);
    const { results } = await fetching.json();
    if (!category) {
      dispatch(getQuestions(results));
    } else {
      dispatch(getQuestions(results));
      dispatch(getChanges());
    }
  }
);

export default fetchAPI;

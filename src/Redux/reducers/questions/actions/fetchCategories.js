import getCategories from './getCategories';

const fetchCategories = () => async (dispatch) => {
  const fetching = await fetch('https://opentdb.com/api_category.php');
  const { trivia_categories: categories } = await fetching.json();
  dispatch(getCategories(categories));
};

export default fetchCategories;

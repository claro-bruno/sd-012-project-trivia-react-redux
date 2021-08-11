const allCategories = { id: '', name: 'All Categories' };
const allDifficulties = { id: '', name: 'All Difficulties' };
const allTypes = { id: '', name: 'All Types' };

const INITIAL_STATE = {
  selectedCategory: allCategories,
  selectedDifficulty: allDifficulties,
  selectedType: allTypes,
  categories: [],
  difficulties: [
    allDifficulties,
    { id: 'easy', name: 'Easy' },
    { id: 'medium', name: 'Medium' },
    { id: 'hard', name: 'Hard' },
  ],
  types: [
    allTypes,
    { id: 'multiple', name: 'Multiple Answer' },
    { id: 'boolean', name: 'True/False' },
  ],
  categoriesError: {},
  isFetchingCategories: false,
};

function config(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SEND_CATEGORIES_REQUEST':
    return {
      ...state,
      isFetchingCategories: true,
    };
  case 'GET_CATEGORIES':
    return {
      ...state,
      categories: [allCategories, ...action.response.trivia_categories],
      isFetchingCategories: false,
    };
  case 'GET_CATEGORIES_ERROR':
    return {
      ...state,
      categoriesError: action.error,
      isFetchingCategories: false,
    };
  case 'UPDATE_SELECTED_CONFIGS':
    return {
      ...state,
      [action.configName]: state[action.configsList]
        .find((c) => c.id === parseInt(action.selected, 10)
          || c.id === action.selected),
    };

  default: return state;
  }
}

export default config;

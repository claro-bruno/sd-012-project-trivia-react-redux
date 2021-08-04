export const SAVE_QUESTS = 'SAVE_QUESTS';
export const SAVE_TOKEN = 'SAVE_TOKEN';
export const SAVE_EMAIL = 'SAVE_EMAIL';
export const SAVE_NAME = 'SAVE_NAME';

export const saveEmail = (email) => ({
  type: SAVE_EMAIL,
  email,
});

export const saveName = (name) => ({
  type: SAVE_NAME,
  name,
});

export const questAction = (quest) => ({
  type: SAVE_QUESTS,
  quest,
});

export const saveToken = (token) => ({
  type: SAVE_TOKEN,
  token,
});

export function fetchQuest(token) {
  return async (dispatch) => {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const data = await response.json();
    dispatch(questAction(data.results));
  };
}

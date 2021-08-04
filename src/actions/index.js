export const SAVE_QUESTS = 'SAVE_QUESTS';
export const SAVE_TOKEN = 'SAVE_TOKEN';

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

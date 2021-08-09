const INITIAL_STATE = {
  remainingTime: 30,
  isOutOfTime: false,
  isQuestionAnswered: false,
  isAnswering: false,
  startTimerCallback: () => null,
  stopTimerCallback: () => null,
};

function timer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'TIMER_CALLBACKS':
    return {
      ...state,
      startTimerCallback: action.startTimerCallback,
      stopTimerCallback: action.stopTimerCallback,
    };
  case 'REMAINING_TIME':
    return {
      ...state,
      remainingTime: action.remainingTime,
    };
  case 'IS_OUT_OF_TIME':
    return {
      ...state,
      isOutOfTime: true,
      isQuestionAnswered: false,
      isAnswering: false,
    };
  case 'IS_QUESTION_ANSWERED':
    return {
      ...state,
      isQuestionAnswered: true,
      isOutOfTime: false,
      isAnswering: false,
    };
  case 'IS_ANSWERING':
    return {
      ...state,
      isAnswering: true,
      isOutOfTime: false,
      isQuestionAnswered: false,
    };
  default: return state;
  }
}

export default timer;

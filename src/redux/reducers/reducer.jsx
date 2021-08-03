// reducers/reducer.jsx

import { ACTION_TEST } from "../actions";

const INITIAL_STATE = {};

const reducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case ACTION_TEST:
			return { ...state, action.data }
		default:
			return state
	}
}

export default reducer;

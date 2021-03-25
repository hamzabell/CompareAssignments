import { INITIAL_STATE } from "../StateDefs";

export default (state, action) => {
  switch (action.type) {
    case "COMPARE_TEXTS":
      return { ...state, current: { ...state.current, ...action.payload } };
    case "POPULATE_HISTORY":
      return { ...state, history: action.payload };
    case "COMPARE":
      return {
        ...state,
        history: [...state.history, action.payload],
        current: {
          ...action.payload,
          similarity: Math.round(
            (parseInt(action.payload.similarity) / 1000) * 100
          ),
        },
      };

    case "RERUN":
      const newHistory = state.history.map((item, idx) =>
        item.id === action.payload.id
          ? (item = {
              ...action.payload,
              studentA: item.studentA,
              studentB: item.studentB,
            })
          : item
      );
      return {
        ...state,
        history: newHistory,
        current: {
          ...action.payload,
          similarity: Math.round(
            (parseInt(action.payload.similarity) / 1000) * 100
          ),
        },
      };

    case "USER_LOGGED_IN":
      return { ...state, isAuthenticated: true };
    case "USER_LOGGED_OUT":
      return INITIAL_STATE;
    default:
      return state;
  }
};

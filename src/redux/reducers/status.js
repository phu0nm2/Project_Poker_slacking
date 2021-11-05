const initialState = {
  isReveal: false,
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_REVEAL":
      state.isReveal = true;
      return { ...state };

    default:
      return state;
  }
};

export default reducer;

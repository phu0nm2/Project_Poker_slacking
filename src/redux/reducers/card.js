let initialState = {
  deckCard: {},
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "SET_DECK_CARD":
      state.deckCard = payload;
      return { ...state };
    default:
      return state;
  }
};

export default reducer;

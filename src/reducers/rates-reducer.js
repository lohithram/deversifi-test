import * as ActionTypes from 'constants/ActionTypes';

const initialState = {
  rates: []
}

const reducer = (state = initialState, action) => {
  let nextState = state;
  switch(action.type) {
    default: {
      return state;
    }
  }
  return nextState;
}

export default reducer;

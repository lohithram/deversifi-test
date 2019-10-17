import * as ActionTypes from 'constants/ActionTypes';

const initialState = {
  rates: {}
}

const reducer = (state = initialState, action) => {
  let nextState = state;
  switch(action.type) {
    case ActionTypes.GET_RATES_DATA_SUCCESS: {
      const rates = Object.assign({}, state.rates)
      rates[action.pair] = action.response[0];
      nextState = {
        ...state,
        rates
      }
      break;
    }
    default: {
      return state;
    }
  }
  return nextState;
}

export default reducer;

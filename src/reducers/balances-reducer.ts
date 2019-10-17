import * as ActionTypes from 'constants/ActionTypes';

interface FilterState {
  balanceByDays: any[]
}

const initialState = {
  balanceByDays: []
}

const reducer = (state: FilterState = initialState, action: any) => {
  let nextState = state;
  switch(action.type) {
    case ActionTypes.GET_ETH_BALANCES_SUCCESS: {
      nextState = { ... state,
        balanceByDays: action.response
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

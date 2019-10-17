import * as ActionTypes from 'constants/ActionTypes';

interface FilterState {
  balanceByDays: any[],
  address?: string
}

const initialState = {
  balanceByDays: []
}

const reducer = (state: FilterState = initialState, action: any) => {
  let nextState = state;
  switch(action.type) {
    case ActionTypes.GET_ETH_BALANCES: {
      nextState = { ... state,
        address: action.address,
        balanceByDays: []
        }
      break;
    }
    case ActionTypes.GET_ETH_BALANCES_SUCCESS: {
      nextState = { ... state,
        balanceByDays: action.response
        }
      break;
    }
    case ActionTypes.GET_ETH_BALANCES_EVENT: {
      nextState = { ... state,
        balanceByDays: state.balanceByDays.concat(action.response)
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

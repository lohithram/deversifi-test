import { getService } from 'services/httpService';
import { getEthBalanceService,
  getAccountsService,
  getHistoricalAccountsService } from 'services/web3Service';

import * as ActionTypes from 'constants/ActionTypes';


export const getEthBalances = () => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_ETH_BALANCES,
  })

  // getEthBalanceService()
  getHistoricalAccountsService()
  .then(response => {
    dispatch({
      type: ActionTypes.GET_ETH_BALANCES_SUCCESS,
      response
    })
  })
  .catch(error => {
    dispatch({
      type: ActionTypes.GET_ETH_BALANCES_FAILURE,
      error
    })
  })
}

  export const removeFilter = () => (dispatch) => {
      // do some stuff
      dispatch({
        type: "REMOVE_FILTER",
      })

      getService("Abc")
      .then(response => {
        dispatch({
          type: "REMOVE_FILTER_SUCCESS",
          response
        })
      })
      .catch(error => {
        dispatch({
          type: "REMOVE_FILTER_ERROR",
          error
        })
      })
  }

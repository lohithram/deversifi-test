import { getService } from 'services/httpService';
import {
  getHistoricalAccountsService,
  objservableAccountBalanceService } from 'services/web3Service';

import * as ActionTypes from 'constants/ActionTypes';

// This employs rxjs for streaming
export const getEthBalances = (address) => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_ETH_BALANCES,
    address
  })

  objservableAccountBalanceService(address)
  .subscribe(response => {
    dispatch({
      type: ActionTypes.GET_ETH_BALANCES_EVENT,
      response
    })
  })
}

// this is my first attempt which returns after fetching all the data
export const getEthBalances1 = () => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_ETH_BALANCES,
  })

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

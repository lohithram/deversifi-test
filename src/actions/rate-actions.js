import { getService } from 'services/httpService';
import * as ActionTypes from 'constants/ActionTypes';

export const getETHUSDRate = () => (dispatch) => {
  dispatch({
    type: ActionTypes.GET_RATES_DATA,
  })

  getService("/tETHUSD")
  .then(response => {
    dispatch({
      type: ActionTypes.GET_RATES_DATA_SUCCESS,
      pair: "ETHUSD",
      response
    })
  })
  .catch(error => {
    dispatch({
      type: ActionTypes.GET_RATES_DATA_FAILURE,
      pair: "ETHUSD",
      error
    })
  })
}

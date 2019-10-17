import {combineReducers} from 'redux';
import balancesReducer from 'reducers/balances-reducer';
import ratesReducer from 'reducers/rates-reducer';

const rootReducer = combineReducers({
  balances: balancesReducer,
  rates: ratesReducer
});

export default rootReducer;

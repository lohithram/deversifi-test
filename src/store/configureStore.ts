import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from "redux-devtools-extension";
import { logger } from 'middleware/logger';

// Not using thunk middleware since we have no need to perform async actions
import thunk from 'redux-thunk';

// reducers
import rootReducer from 'reducers/index';

export type AppState = ReturnType<typeof rootReducer>;

export default function configureStore(initialState?: AppState) {
  const middleware = applyMiddleware(logger, thunk);

  if (process.env.NODE_ENV !== 'production' && module.hot) {
    module.hot.accept('reducers', () => store.replaceReducer(rootReducer))
  }

  const store = createStore(rootReducer,
                            initialState,
                            composeWithDevTools(middleware));
  return store;
}

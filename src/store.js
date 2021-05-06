import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './redux/reducers/index';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  initialState,
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

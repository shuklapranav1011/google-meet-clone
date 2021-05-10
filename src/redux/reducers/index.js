import { combineReducers } from 'redux';
import videoReducer from './videoReducer';

const rootReducer = combineReducers({
  video: videoReducer,
});

export default rootReducer;

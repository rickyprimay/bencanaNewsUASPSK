import { combineReducers } from 'redux';
import authReducer from '../slice/authSlice';
import disasterReducer from '../slice/disasterSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  disasters: disasterReducer,
});

export default rootReducer;

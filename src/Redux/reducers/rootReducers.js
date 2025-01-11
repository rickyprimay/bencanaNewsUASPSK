import { combineReducers } from 'redux';
import authReducer from '../slice/authSlice';
import disasterReducer from '../slice/disasterSlice';
import dashboardDisasterReducer from '../slice/dashboardDisasterSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  disasters: disasterReducer,
  dashboardDisasters: dashboardDisasterReducer,
});

export default rootReducer;

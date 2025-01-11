import { combineReducers } from 'redux';
import authReducer from '../slice/authSlice';
import disasterReducer from '../slice/disasterSlice';
import dashboardDisasterReducer from '../slice/dashboardDisasterSlice';
import updateDeleteDisasterReducer from '../slice/updateDeleteDisaster';

const rootReducer = combineReducers({
  auth: authReducer,
  disasters: disasterReducer,
  dashboardDisasters: dashboardDisasterReducer,
  updateDeleteDisaster: updateDeleteDisasterReducer,
});

export default rootReducer;

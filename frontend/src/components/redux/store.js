import { createStore, combineReducers } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import reducers from "./reducers/index";
import userReducer from './reducers/userReducer';
import authReducer from './reducers/authSlice';

const rootReducer = combineReducers({
    ...reducers,
    auth: authReducer,
    userData: userReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
import  { combineReducers } from 'redux';
import  itemReducer from './itemReducer';
import errorReducer from './errorReducer';
import authReducer from './authReducer';

const allReducer =  combineReducers({
    item: itemReducer,
    error: errorReducer,
    auth: authReducer
})

export default allReducer;
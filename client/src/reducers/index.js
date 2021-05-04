import  { combineReducers } from 'redux';
import  itemReducer from './itemReducer';

const allReducer =  combineReducers({
    item: itemReducer
})

export default allReducer;
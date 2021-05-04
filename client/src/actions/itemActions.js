import axios from 'axios';
import * as actions from './types';

export const getItem = () => dispatch => {
    dispatch(setItemLoading());
    axios.get('http://localhost:5000/api/items')
    .then(res => 
        dispatch({
            type: actions.GET_ITEMS,
            payload: res.data
    }))
    .catch(err => {
        console.log(err);
    })
};

export const addItem = item => dispatch => {
    axios.post('http://localhost:5000/api/items', item)
    .then(res => dispatch({
        type: actions.ADD_ITEM,
        payload: res.data
    }));
};

export const deleteItem = id => dispatch => {
    axios.delete(`http://localhost:5000/api/items/${id}`)
    .then(res => dispatch({
        type: actions.DELETE_ITEM,
        payload: id
    }));
};

export const setItemLoading = () => {
    return {
        type: actions.ITEMS_LOADING
    }
}
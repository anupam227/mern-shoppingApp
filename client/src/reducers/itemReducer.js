import * as actions from '../actions/types';


const intialState = {
    items: [],
    loading: false
}

export default function(state = intialState, action) {
    switch(action.type) {
        case actions.GET_ITEMS: 
            return {
                ...state,
                items: action.payload,
                loading: false
            };
        case actions.ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items]
            };   
        case actions.DELETE_ITEM: 
            return {
                ...state,
                items : state.items.filter(item => item._id !== action.payload)
            };
        case actions.ITEMS_LOADING: 
            return {
                ...state,
                loading: true
            }        
        default:
            return state; 
    }
}
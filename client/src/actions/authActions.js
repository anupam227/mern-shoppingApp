import axios from 'axios';
import * as actions from './types';
import { returnErrors } from './errorActions';

export function tokenConfig (getState){
    const token = localStorage.getItem('token');

    const config = {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }

    if(token) {
        config.headers.authorization = 'Bearer ' + token
    }    

    return config
}

export const loadUser = (user) => (dispatch,getState) => {
    // user loading
    console.log(user)
    dispatch({
        type: actions.USER_LOADING
    });

    axios.get('http://localhost:5000/api/auth/user',tokenConfig(getState))
    .then(res => dispatch({
        type: actions.USER_LOADED,
        payload: res.data
    }))
    .catch(err => {
        dispatch(returnErrors(err.response.data.message, err.response.status))
        dispatch({
            type: actions.AUTH_ERROR 
        });
    });
}



export const register = ({name, email, password}) => dispatch => {
    const config = {
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({name,email,password});
    axios.post('http://localhost:5000/api/users/signup',body, config)
    .then(res => {
        dispatch({
            type: actions.REGISTER_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data.message, err.response.status,'REGISTER_FAIL'))
        dispatch({
            type: actions.REGISTER_FAIL
        })
    })
}

export const logout = () => {
    return {
        type: actions.LOGOUT_SUCCESS
    }
}

export const login = ({email,password}) => dispatch => {
    const config = {
        headers: {
            Accept: "application/json",
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify({email,password});
    axios.post('http://localhost:5000/api/users/login',body, config)
    .then(res => {
        dispatch({
            type: actions.LOGIN_SUCCESS,
            payload: res.data
        })
    })
    .catch(err => {
        dispatch(returnErrors(err.response.data.message, err.response.status,'REGISTER_FAIL'))
        dispatch({
            type: actions.REGISTER_FAIL
        })
    })
}
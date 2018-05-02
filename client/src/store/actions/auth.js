import {axiosCall} from '../../services/api.js';
import {SET_CURRENT_USER} from '../actionTypes';
import {addError, removeError} from './errors';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    };
}

export function logout() {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return axiosCall("post", `/api/auth/logout`)
            .then(
                res => {
                    localStorage.clear();
                    dispatch(removeError());
                    dispatch(setCurrentUser({}));
                    resolve(); 
                }
            ).catch(err => {
                dispatch(addError(err.message));
                reject();
            });
        });
    }
}

export function authUser(path, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return axiosCall("post", `/api/auth/${path}`, userData)
            .then(
                user => {
                    localStorage.setItem("authenticated", true);
                    dispatch(removeError());
                    dispatch(setCurrentUser(user));
                    resolve(); 
                }
            ).catch(err => {
                dispatch(addError(err.message));
                reject();
            });
        });
    }
}
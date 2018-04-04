import {axiosCall} from '../../services/api.js';
import {SET_CURRENT_USER} from '../actionTypes';

export function setCurrentUser(user) {
    return {
        type: SET_CURRENT_USER,
        user: user
    };
}

export function authUser(path, userData) {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return axiosCall("post", `/api/auth/${path}`, userData)
            .then(
                ({token, ...user}) => {
                    localStorage.setItem("jwtToken", token);
                    dispatch(setCurrentUser(user));
                    resolve();
                }
            );
        });
    }
}
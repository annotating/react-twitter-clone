import {axiosCall} from '../../services/api';
import {addError} from './errors';
import {setCurrentUser} from './auth';

export const updateUser = userData => (dispatch, getState) => {
    let {currentUser} = getState();
    const id = currentUser.user.id;
    console.log(userData);
    return axiosCall("post", `/api/users/${id}`, userData)
    .then(user => {
        dispatch(setCurrentUser(user))
    }).catch(err => {
        dispatch(addError(err.message))
    });
}
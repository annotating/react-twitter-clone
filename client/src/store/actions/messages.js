import {axiosCall} from '../../services/api';
import {addError} from './errors';
import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

export const loadMessages = messages => ({
    type: LOAD_MESSAGES,
    messages
})

export const fetchMessages = () => {
    return dispatch => {
        return axiosCall('get', '/api/messages')
        .then(res => {
            dispatch(loadMessages(res))
        }).catch(err => {
            dispatch(addError(err.message))
        });
    }
}

export const remove = id => ({
    type: REMOVE_MESSAGE,
    id
})

export const removeMessage = (userId, messageId) => {
    return dispatch => {
        return axiosCall('delete', `/api/users/${userId}/messages/${messageId}`)
            .then(res => dispatch(remove(messageId)))
            .catch(err => dispatch(addError(err)));
    }
};

export const addNewMessage = text => (dispatch, getState) => {
    let {currentUser} = getState();
    const id = currentUser.user.id;
    return axiosCall('post', `/api/users/${id}/messages`, {text})
        .catch(err => dispatch(addError(err.message)));
}
import {LOAD_MESSAGES, REMOVE_MESSAGE} from '../actionTypes';

export const messages = (state=[], action) => {
    switch(action.type) {
        case LOAD_MESSAGES:
            return [...action.messages];
        case REMOVE_MESSAGE:
            return state.messages.filter(message => message._id !== action.id);
        default:
            return state;
    }
}

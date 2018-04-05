import {combineReducers} from 'redux';
import currentUser from './currentUser';
import {messages} from './messages';
import errors from './errors';

const rootReducer = combineReducers({
    currentUser,
    messages,
    errors
});

export default rootReducer;
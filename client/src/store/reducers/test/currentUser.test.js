import currentUser from '../currentUser';
import {SET_CURRENT_USER} from '../../actionTypes';

describe('currentUser reducer', () => {
    test ('returns initial state', () => {
        let initialState = {
            isAuthenticated: false,
            user: {}
        };
        expect(currentUser(undefined, {})).toEqual(initialState);
    })
    
    test('sets user', () => {
        let beforeState = {
            user: null
        }
        let action = {
            type: SET_CURRENT_USER,
            user: {
                email: 'test@email.com'
            }
        }
        expect(currentUser(beforeState, action)).toEqual({
            isAuthenticated: true,
            user: action.user
        });
    })
});


import {ADD_ERROR, REMOVE_ERROR} from '../../actionTypes';
import errors from '../errors';

describe('errors reducer', () => {
    test('returns initial state', () => {
        expect(errors(undefined, {})).toEqual({message: null});
    })
    
    test('adds error', () => {
        let action = {
            type: ADD_ERROR,
            error: 'test error message'
        };
        expect(errors(undefined, action)).toEqual({message: action.error});
    })
    
    test('removes error', () => {
        let beforeState = {
            message: 'test error message'
        };
        let action = {
            type: REMOVE_ERROR,
        };
        expect(errors(beforeState, action)).toEqual({message: null});
    })
});


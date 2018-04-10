import {addError, removeError} from '../errors';
import * as actionTypes from '../../actionTypes' 

describe('errors action', () => {
    test('creates add error action', () => {
        let error = 'test';
        expect(addError(error)).toEqual({
            type: actionTypes.ADD_ERROR,
            error   
        })
    })
});
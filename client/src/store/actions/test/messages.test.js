import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as messageActions from '../messages';
import * as actionTypes from '../../actionTypes';

describe('messages action', () => {
    test('creates load message action', () => {
        let messages = [{_id: 123, text: 'test'}];
        expect(messageActions.loadMessages(messages)).toEqual({
            type: actionTypes.LOAD_MESSAGES,
            messages   
        })
    })

    test('creates remove message action', () => {
        let id = 123;
        expect(messageActions.remove(id)).toEqual({
            type: actionTypes.REMOVE_MESSAGE,
            id   
        })
    })
});

let httpMock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);

describe('async message actions', () => {
    let store;
    
    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        httpMock.restore();
        httpMock.reset();
    });

    test('creates load message action when fetch complete', () => {
        httpMock.onGet('/api/messages').reply(200, 
            [{_id:7}, {_id:11}, {_id:15}]
        );
       
        let expected = {
            type: actionTypes.LOAD_MESSAGES,
            messages: [{_id:7}, {_id:11}, {_id:15}]
        };
        store.dispatch(messageActions.fetchMessages()).then(() => {
            expect(store.getActions()[0]).toEqual(expected);
        });
    });
});
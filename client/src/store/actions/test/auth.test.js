import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as authActions from '../auth';
import * as actionTypes from '../../actionTypes';

describe('auth action', () => {
    test('creates set user action', () => {
        let user = [{id: 123, email: 'test@test.com'}];
        expect(authActions.setCurrentUser(user)).toEqual({
            type: actionTypes.SET_CURRENT_USER,
            user   
        })
    })

    test('sets authorization token', () => {
        let token = 'test';
        authActions.setAuthorizationToken(token);

        expect(axios.defaults.headers.common['Authorization']).toEqual(
            `Bearer ${token}`
        )
    })

    test('removes authorization token', () => {
        let token = '';
        authActions.setAuthorizationToken(token);

        expect(axios.defaults.headers.common['Authorization']).toBeFalsy()
    })
});

let httpMock = new MockAdapter(axios);
const mockStore = configureMockStore([thunk]);

describe('async auth actions', () => {
    let store;
    
    beforeEach(() => {
        store = mockStore({});
    });

    afterEach(() => {
        httpMock.reset();
    });

    test('signs up new user', () => {
        let path = 'signup';
        let user = {
            email: 'test@test.com',
        };

        let token = '123lkj424l';
        httpMock.onPost(`/api/auth/${path}`, user).reply(200, 
            {...user, id: 1, token: token}
        );
       
        let expectedActions = [ 
            { 
                type: 'REMOVE_ERROR' },        
            { 
                type: 'SET_CURRENT_USER',
                user: {email: 'test@test.com', id: 1} 
            } 
        ];

        store.dispatch(authActions.authUser(path, user)).then(res => {
            expect(localStorage.getItem("jwtToken")).toEqual(token);
            expect(axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${token}`);
            expect(store.getActions()).toEqual(expectedActions);
        });
    })

    test('logs out user', () => {
        let path = 'login';
        let user = {
            email: 'test@test.com',
        };

        let token = '123lkj424l';
        httpMock.onPost(`/api/auth/${path}`, user).reply(200, 
            {...user, id: 1, token: token}
        );

        let expectedLoginActions = [ 
            { 
                type: 'REMOVE_ERROR' },        
            { 
                type: 'SET_CURRENT_USER',
                user: {email: 'test@test.com', id: 1} 
            } 
        ];

        let expectedLogoutActions = [{ 
            type: 'SET_CURRENT_USER',
            user: {} 
        }];

        store.dispatch(authActions.authUser(path, user)).then(res => {
            expect(localStorage.getItem("jwtToken")).toEqual(token);
            expect(axios.defaults.headers.common['Authorization']).toEqual(`Bearer ${token}`);
            expect(store.getActions()).toEqual(expectedLoginActions);
            store.clearActions()

            store.dispatch(authActions.logout());
            expect(localStorage.getItem("jwtToken")).toBeFalsy();
            expect(axios.defaults.headers.common['Authorization']).toBeFalsy();
            expect(store.getActions()).toEqual(expectedLogoutActions);
        });
    });

});

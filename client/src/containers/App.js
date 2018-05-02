import React from 'react';
import {Provider} from 'react-redux';
import {configureStore} from '../store';
import {BrowserRouter as Router} from 'react-router-dom';
import NavBar from './NavBar';
import Main from './Main';
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/errors';

const store = configureStore();

// check session if user refreshes page
// maybe there's a better way to do this...
if (localStorage.authenticated && !store.getState().user) {
  try {
    store.dispatch(authUser("login", {}))
    .catch(err => {
      localStorage.clear();
      // remove error display if session login
      // so user doesn't get confused
      store.dispatch(removeError()); 
    });
  } catch(err) {
    localStorage.clear();
    store.dispatch(removeError());
  }
}

const App = () => (
  <Provider store={store}>
    <Router>
      <div className="onboarding">
        <NavBar/>
        <Main/>
      </div>
    </Router>
  </Provider>
)

export default App;

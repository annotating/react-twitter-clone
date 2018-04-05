import React from 'react';
import {Switch, Route, withRouter} from 'react-router';
import {connect} from 'react-redux';
import HomePage from '../components/HomePage';
import AuthForm from '../components/AuthForm';
import {authUser} from '../store/actions/auth';
import {removeError} from '../store/actions/errors';

const Main = props => {
    const {currentUser, authUser, errors, removeError} = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" 
                    render={props => 
                        <HomePage 
                            {...props} 
                            currentUser={currentUser} 
                        /> 
                    }>
                </Route>
                <Route exact path="/login" 
                    render={props => 
                        <AuthForm 
                            errors={errors}
                            {...props} 
                            onAuth={authUser}
                            removeError={removeError}
                            buttonText="Login"
                            heading="Welcome Back!"
                        />
                    }>
                </Route>
                <Route exact path="/signup" 
                    render={props => 
                        <AuthForm 
                            errors={errors}
                            signUp
                            {...props} 
                            onAuth={authUser}
                            removeError={removeError}
                            buttonText="Signup"
                            heading="Create New Account"
                        />
                    }>
                </Route>
            </Switch>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        errors: state.errors
    };
}

export default withRouter(connect(mapStateToProps, {authUser, removeError})(Main));
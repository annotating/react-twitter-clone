import React from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router';
import {connect} from 'react-redux';
import HomePage from '../components/HomePage';
import AuthForm from '../components/AuthForm';
import {authUser} from '../store/actions/auth';

const Main = props => {
    const {authUser} = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" 
                    render={props => 
                        <HomePage {...props}/> 
                    }>
                </Route>
                <Route exact path="/login" 
                    render={props => 
                        <AuthForm 
                            {...props} 
                            onAuth={authUser}
                            buttonText="Login"
                            heading="Welcome Back!"
                        />
                    }>
                </Route>
                <Route exact path="/signup" 
                    render={props => 
                        <AuthForm 
                            signUp
                            {...props} 
                            onAuth={authUser}
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
        currentUser: state.currentUser
    };
}

export default withRouter(connect(mapStateToProps, {authUser})(Main));
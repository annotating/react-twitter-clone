import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = ({currentUser}) => {
    if (!currentUser.isAuthenticated) {
        return (
            <div className="home-hero">
                <h1>Welcome!</h1>
                <Link to="signup" className="btn btn-primary">
                    Join Now
                </Link>
            </div>
        );
    }
    return (
        <div>
            Welcome back!
        </div>
    )
};

export default HomePage;
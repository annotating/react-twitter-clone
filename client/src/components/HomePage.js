import React from 'react';
import {Link} from 'react-router-dom';
import MessageTimeline from './MessageTimeline';

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
        <div className="container">
            <MessageTimeline
                profileImageUrl={currentUser.profileImageUrl}
                username={currentUser.user.username}
            />
        </div>
    )
};

export default HomePage;
import React from 'react';
import {Link} from 'react-router-dom';

const HomePage = () => (
    <div className="home-hero">
        <h1>Welcome!</h1>
        <Link to="signup" className="btn btn-primary">
            Join Now
        </Link>
    </div>
);

export default HomePage;
import React from 'react';
import {Link} from 'react-router-dom';
import DefaultProfileImg from '../images/doge-bread.jpg';

const UserAside =  ({id, profileImageUrl, username}) => {
    return (
    <aside className="panel panel-default">
        <img 
            className="img-fluid"
            src={profileImageUrl || DefaultProfileImg}
            alt={username}
        />
        <p>
            <Link to={`/users/${id}/edit`}>@{username} &nbsp;</Link>
        </p>
    </aside>
    )
}

export default UserAside;
import React from 'react';
import Moment from 'react-moment';
import {Link} from 'react-router-dom';
import DefaultProfileImg from '../images/doge-bread.jpg';

const MessageItem = ({date, profileImageUrl, text, username, removeMessage, isCorrectUser}) => (
    <div>
        <li className="list-group-item">
            <img className="timeline-image" 
                src={profileImageUrl || DefaultProfileImg}
                alt={username}
            />
            <div className="message-area">
                <Link to='/'>@{username} &nbsp;</Link>
                <span className="text-muted">
                    <Moment className="text-muted" format="Do MMM YYYY">
                        {date}
                    </Moment>
                </span>
                <p>{text}</p>
                {isCorrectUser && (
                    <a className="btn btn-danger" onClick={removeMessage}>
                        Delete
                    </a>
                )}
            </div>
        </li>
    </div>
);

export default MessageItem;
import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeline = ({profileImageUrl, username}) => {
    return (
        <div className="row">
            <div className="user-aside col-sm-2">
                <UserAside
                    profileImageUrl={profileImageUrl}
                    username={username}
                />
            </div>
            <MessageList/>
        </div>
    )
};

export default MessageTimeline;
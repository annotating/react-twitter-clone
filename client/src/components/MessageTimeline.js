import React from 'react';
import MessageList from '../containers/MessageList';
import UserAside from './UserAside';

const MessageTimeline = ({profileImageUrl, username}) => {
    return (
        <div className="row justify-content-center">
            <div className="user-aside col-xs-4">
                <UserAside
                    profileImageUrl={profileImageUrl}
                    username={username}
                />
            </div>
            <div className="col">
                <MessageList/>
            </div>
        </div>
    )
};

export default MessageTimeline;
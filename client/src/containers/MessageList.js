import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchMessages, removeMessage} from '../store/actions/messages';
import MessageItem from '../components/MessageItem';

class MessageList extends Component {
    componentDidMount() {
        this.props.fetchMessages();
    }
    render() {
        const {messages, currentUserId, removeMessage} = this.props;
        let messageList = messages.map(m => {
            return <MessageItem 
                key={m._id}
                date={m.createdAt}
                text={m.text}
                username={m.user.username}
                profileImageUrl={m.user.profileImageUrl}
                removeMessage={removeMessage.bind(this, m.user._id, m._id)}
                isCorrectUser={currentUserId === m.user._id}
            />
        });
        return (
            <ul className="list-group" id="messages">
                {messageList}
            </ul>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.messages,
        currentUserId: state.currentUser.user.id
    }
}

export default connect(mapStateToProps, {fetchMessages, removeMessage})(MessageList);
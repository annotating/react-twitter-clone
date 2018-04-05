import React, {Component} from 'react';
import {connect} from 'react-redux';
import {addNewMessage} from '../store/actions/messages';

class MessageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ""
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.addNewMessage(this.state.message);
        this.setState({message: ""});
        this.props.history.push('/');
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                {this.props.errors.message && (
                    <div className="alert alert-danger">
                        {this.props.errors}
                    </div>
                )}
                <input 
                    type="text"
                    name="message"
                    className="form-control"
                    value={this.state.message}
                    onChange={this.handleChange}
                />
                <button 
                    type="submit"
                    className="btn btn-success pull-right"
                >
                    Submit
                </button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors
    }
}

export default connect(mapStateToProps, {addNewMessage})(MessageForm);
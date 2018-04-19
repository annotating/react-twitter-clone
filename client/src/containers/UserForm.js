import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../store/actions/user';

class UserForm extends Component {
    constructor(props) {
        super(props);

        const {username, profileImageUrl} = this.props.user;
        this.state = {
            username: username,
            profileImageUrl: profileImageUrl
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.updateUser(this.state);
        this.setState({message: ""});
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2 className="text-center">Update Profile</h2>
                {this.props.errors.message && (
                    <div className="alert alert-danger">
                        {this.props.errors.message}
                    </div>
                )}
                {/* <label htmlFor="email">Email:</label>
                <input 
                    type="text"
                    id="email"
                    name="email"
                    className="form-control"
                    placeholder={email}
                    readOnly
                /> */}
                <label htmlFor="username">Username:</label>
                <input 
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={this.state.username}
                    onChange={this.handleChange}
                />
                <label htmlFor="password">Password:</label>
                <input 
                    type="password"
                    id="password"
                    name="password"
                    onChange={this.handleChange} 
                    className="form-control"
                />
                <label htmlFor="profileImageUrl">Image URL:</label>
                <input 
                    type="text"
                    id="profileImageUrl"
                    name="profileImageUrl"
                    className="form-control"
                    value={this.state.profileImageUrl}
                    onChange={this.handleChange}
                />
                <button 
                    type="submit"
                    className="btn btn-success pull-right mt-4"
                >
                    Submit
                </button>
            </form>
        );
    }
}

function mapStateToProps(state) {
    return {
        errors: state.errors,
        user: state.currentUser.user
    }
}

export default connect(mapStateToProps, {updateUser})(UserForm);
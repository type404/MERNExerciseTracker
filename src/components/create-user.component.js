import React, { Component } from 'react';
import axios from 'axios';
export default class CreateUsers extends Component {
    constructor(props){
        super(props);

        //the code below tells what 'this' is, otherwise 'this' is undefined. We are binding this. 
        this.onChangeUsername = this.onChangeUsername.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
        }
    }
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
        
        }

        console.log(user);
//axios.post sends a post request to the backend endpoint. We have the route for this in our users route in backend
        axios.post('http://localhost:5000/users/add',user)
        .then(res => console.log(res.data));

        this.setState({
            username: ''
        })
    }
    render() {
        return (
            <div>
            <p>Create New Exercise Log</p>
            <form onSubmit={this.onSubmit}>
            <div className="form-group">
            <label>Username: </label>
            <input type="text"
            required
            className="form-control"
            value={this.state.username}
            onChange={this.onChangeUsername}/>
            </div>
            <div className="form-group">
                <input type="submit" value="Create User" className="btn btn-primary"></input>
            </div>
            </form>
            </div>
        )
    }
}
import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css"
export default class CreateExercises extends Component {
    //state is how you create variables in react, so that we can update the value when we render page again
    constructor(props){
        super(props);

        //the code below tells what 'this' is, otherwise 'this' is undefined. We are binding this. 
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            description: '',
            date: new Date(),
            users: []
        }
    }
//react lifecycle method auto called before anything displays on the page
componentDidMount() {
    axios.get('http://localhost:5000/users/')
    .then(response => {
        if(response.data.length > 0){
            this.setState({
                users: response.data.map(user => user.username),
                username: response.data[0].username
            })
        }
    })
}


//set the value of the username to whatever the value is in the form, this will only update the username
    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }
    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        })
    }
    onChangeDate(date) {
        this.setState({
            date: date
        })
    }
    onChangeDuration(e) {
        this.setState({
            duration: e.target.value
        })
    }

    //method to handle the submit
    onSubmit(e) {
        e.preventDefault();

        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }

        console.log(exercise);
        axios.post('http://localhost:5000/exercises/add',exercise)
        .then(res => console.log(res.data));
        window.location = "/";
    }
    render() {
        return (
            <div>
                <p>Create New Exercise Log</p>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                <label>Username: </label>
                <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                // we are getting options in select box from JS array
                {
                    this.state.users.map((user)=>{
                       return <option
                        key={user}
                        value={user}>{user}
                        </option>
                    })
                }
                </select>
                </div>
                <div className="form-group">
                <label>Description: </label>
                <input type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
                </div>
                <div className="form-group">
                <label>Duration (mins): </label>
                <input type="text"
                required
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
                </div>
                <div className="form-group">
                <label>Date: </label>
                <div>
                <DatePicker
                    selected={this.state.date}
                    onChange={this.onChangeDate}
                    />
                </div>
                </div>
                <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary"></input>
                </div>
                </form>
            </div>
        )
    }
}
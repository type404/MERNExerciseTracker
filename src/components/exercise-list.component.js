import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//adding the exercise component in the same file. It is implemeneted as functional react component. It is different because it doesnt have state and lifecycle method. It is used for props. 

//it accepts the props and returns a row pf the table.
    //link to edit url. We have a delete button and passed delete method
const Exercise = props => (
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
        <Link to={"/edit/"+props.exercise._id}>edit</Link>| <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
        </td>
    </tr>
    )


//this is a class component
export default class ExercisesList extends Component {
    constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {exercises: []};
    }
    //get all exercises and add before page loads
    componentDidMount() {
        axios.get('http://localhost:5000/exercises/')
        .then(response => {
            this.setState({ exercises: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
    }

    //takes in ID of teh object and delete
    deleteExercise(id) {
        axios.delete('http://localhost:5000/exercises/'+ id)
        .then(res => console.log(res.data));
        //also delete exercise from the table that is being deleted, to do this we set the state again. we filter and return only the elemenets whose id doesnt equal to the id that we are deleting
        this.setState({
            exercises: this.state.exercises.filter(el => el._id !== id)
        })
    }
    //.map returns something for every element in the array. It is going to return the exercise component. we are passing in three props currentexercsie, deleteexercise and key. 
    exerciseList() {
        return this.state.exercises.map(currentexercise => {
            return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
        })
    }
    render() {
        return (
            <div>
                <h3>Logged Exercises</h3>
                <table className="table">
                <thead className="thead-light">
                <tr>
                <th>Username</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Date</th>
                <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { this.exerciseList() }
                </tbody>
                </table>
            </div>
        )
    }
}
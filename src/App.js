import React from 'react';
//install bootstrap npm install bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//import the components we have created
import Navbar from "./components/navbar.component";
import ExerciseList from "./components/exercise-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreateUser from "./components/create-user.component";
//install react router npm install react-router-dom it makes it easier to route different url to differnt componenents
import { BrowserRouter as Router, Route } from "react-router-dom";
//Below are the components we have to create. 
function App() {
  return (
    <Router>

      <Navbar/>
      <br/>
        <Route path="/" exact component={ExerciseList} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/user" component={CreateUser} />
    </Router>
  );
}

export default App;

//import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar.component"
import ExercisesList from "./components/exercises-list.component";
import EditExercise from "./components/edit-exercise.component";
import CreateExercise from "./components/create-exercise.component";
import CreatePatient from "./components/create-patient.component";
import React from "react";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Routes>
        <Route path="/" exact element={<ExercisesList/>} />
        <Route path="/edit/:id" element={<EditExercise></EditExercise>} />
        <Route path="/create" element={<CreateExercise/>} />
        <Route path="/patient" element={<CreatePatient/>} />
      </Routes>
      
      </div>
    </Router>
  );
}

export default App;

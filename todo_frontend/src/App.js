import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Navbar from './Navbar';
import Register from './Register';
import './App.css';

function App() {
    return (
        <Router>
            <Navbar />
            <Home/>
            <Routes>
                <Route key={"nezuware"} path="/register" component={Register} />
            </Routes>
        </Router>
    );
}

export default App;

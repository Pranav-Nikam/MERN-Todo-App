import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from './Todo-logo.png'

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-container">
                <img src={logo} alt="Todo Logo" className="navbar-logo-img" />
                <Link to="/" className="navbar-logo">TodoApp</Link>
                <div className="navbar-links">
                    <Link to="/login" className="navbar-link">Login</Link>
                    <Link to="/register" className="navbar-link">Register</Link>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

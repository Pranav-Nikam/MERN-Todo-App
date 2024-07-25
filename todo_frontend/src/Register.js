import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/auth/register', {
                username,
                password
            });
            console.log(response.data);
            alert('User registered successfully');
        } catch (err) {
            console.error(err);
            alert('Error registering user');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default Register;

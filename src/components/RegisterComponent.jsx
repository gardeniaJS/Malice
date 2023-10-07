import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import Axios from 'axios';

export default function RegisterComponent () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        try {
            const response = await Axios.post('/api/register', {email, password}); 
        } catch (error) {
            console.error('Registration failed:', error );
        }
    };

    return (
        <div className="container mt-5">
        <Form>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
  
          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
  
          <Button variant="primary" onClick={handleRegister}>
            Register
          </Button>
        </Form>
      </div>
    );
}

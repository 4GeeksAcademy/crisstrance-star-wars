import React, { useState, useContext } from 'react';
import {Context} from "../store/appContext"
import { Form, Button, Card } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { db, User } from 'py-loader!../../../api/models.py';


//src/api/models.py

const SignUp = () => {

  const {store, actions} = useContext(Context)
  const navigate = useNavigate()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    actions.signUp(name,email,password)
    try {
      // Create a new User object
      const newUser = {
        name: name,
        email: email,
        password: password,
        is_active: true, // or false, depending on your application logic
      };
  
      // Save the new User object to the database
      db.session.add(newUser);
      db.session.commit();
  
      console.log("User saved to database:", newUser);
      navigate("/login")
    } catch (error) {
      console.error(error);
    }
  };
  /*const handleSubmit = async (event) => {
    event.preventDefault();

    actions.signUp(name,email,password)
    navigate("/login")
  };


    try {
      // Make HTTP request to save user data
      const response = await axios.post('https://3000-yonatancres-steamkiller-n2csm11huke.ws-us90.gitpod.io/signup', {
        name: name,
        email: email,
        password: password,
      });

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };*/


  return (
    <Card style={{ width: '20rem', margin: 'auto', marginTop: '50px' }}>
      <Card.Body>
        <Card.Title className="text-center">Sign Up</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Enter name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </Form.Group>
          <div className="text-center">
            <Button variant="primary" type="submit">
              Sign Up
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SignUp;

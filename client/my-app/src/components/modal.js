import React, { useState, Component } from "react";

import { Button, Modal, Form } from 'react-bootstrap';
import API from "../services/api";
import config from "../config/config";

export default function Example({workers, role}) {
    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [position, setPosition] = useState('');
    const [err, setErr] = useState('');
    const [succ, setSucc] = useState('');

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const changeName = (e) => {
        console.log(e);
    }

    const createUser = async (e) => {

        e.preventDefault();
        if(position === ''){
            
        }
        const formData = {
            name,
            login,
            password,
            role: parseInt(position)
        }
        const authToken = localStorage.getItem("AuthToken");
       const test = await API.post(`${config.API_URL}/api/auth/signin`, formData, {
          headers: {
            Authorization: authToken,
          },
        })
       console.log(test);

    };

    return (
      <>
        <a href="#" variant="primary" onClick={handleShow}>
          Create
        </a>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{err}</Modal.Title>
            <Modal.Title>{succ}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form action="/send">
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" onChange={(e)=> setName(e.target.value)} placeholder="Enter Name" />
            </Form.Group>

            <Form.Group>
                <Form.Label>Login</Form.Label>
                <Form.Control type="text" onChange={(e)=> setLogin(e.target.value)} placeholder="Enter Login" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" onChange={(e)=> setPassword(e.target.value)} placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Select the position</Form.Label>
                <Form.Control as="select" value="2" onChange={(e)=> setPosition(parseInt(e.target.value))}>
                <option value="2">admin</option>
                <option value="3">operator</option>
                <option value="6">curier</option>
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="button" onClick={createUser} block>
                Submit
            </Button>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            {/* <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button> */}
          </Modal.Footer>
        </Modal>
      </>
    );
  }
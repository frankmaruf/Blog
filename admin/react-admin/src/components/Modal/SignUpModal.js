import React, { useState } from "react";
import { Col, Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userAction";
const SignUpModal = ({ signUpshow, handleShow }) => {
  const dispatch = useDispatch();
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: new Date().toLocaleDateString(),
    username: "",
    password: "",
    password_confirm: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPerson((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const value = {
      first_name: person.first_name,
      last_name: person.last_name,
      email: person.email,
      date_of_birth: person.date_of_birth,
      username: person.username,
      password: person.password,
      password_confirm: person.password_confirm,
    };
    console.log(value);
    dispatch(register(value));
    setPerson({
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: new Date().toLocaleDateString(),
      username: "",
      password: "",
      password_confirm: "",
    });
  };
  return (
    <>
      <Modal
        show={signUpshow}
        onHide={handleShow}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* User Add Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="first_name"
                type="name"
                value={person.first_name}
                placeholder="First Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last_name"
                type="name"
                value={person.last_name}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </Form.Group>
            <input
              name="date_of_birth"
              type="date"
              value={person.date_of_birth}
              onChange={handleChange} //only when value has changed
            />
            <Form.Group controlId="formGridEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={person.email}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={person.username}
                name="username"
                type="name"
                placeholder="@Username"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                value={person.password}
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridPasswordConfirm">
              <Form.Label>Password Confirm</Form.Label>
              <Form.Control
                value={person.password_confirm}
                name="password_confirm"
                type="password"
                placeholder="Confirm Password"
                onChange={handleChange}
              />
            </Form.Group>
            <button
              style={{
                background: "blue",
                color: "white",
                marginLeft: "40%",
                marginRight: "50%",
                marginTop: "5%",
              }}
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </Form>
          {/* User Add Form */}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="submit"
            className="btn btn-default"
            onClick={handleShow}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SignUpModal;

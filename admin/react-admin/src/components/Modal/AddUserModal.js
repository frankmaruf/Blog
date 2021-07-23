import React, { useState, useContext, useEffect } from "react";
import { Modal } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { Form, Col } from "react-bootstrap";
import { MyData } from "../Store";
import { UserConst } from "../Store/Const/userConst";
import {useDispatch,useSelector} from "react-redux"
import axios from "axios";
import DatePicker from "react-date-picker";
import { userAddedByAdmin } from "../actions/userAction";
import {isEqual} from "lodash"

const AddUserModal = ({ addUsershow, setAddUserShow }) => {
  const dispatch = useDispatch()
  const [roles, setRoles] = useState([]);
  const [person, setPerson] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role_id: 0,
    date_of_birth: new Date(),
    username: "",
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
    const date = person.date_of_birth.toISOString().split("T");
    console.log(date[0]);
    const value = {
      first_name: person.first_name,
      last_name: person.last_name,
      email: person.email,
      role_id: person.role_id,
      date_of_birth: date[0],
      username: person.username,
    };
    dispatch(userAddedByAdmin(value))
    setPerson({
      first_name: "",
    last_name: "",
    email: "",
    role_id: 0,
    date_of_birth: new Date(),
    username: "",
    })
  };

  const handleClose = () => setAddUserShow(false);
  const getRoles = async () => {
    const response = await axios.get("roles");
    setRoles(response.data.data);
  };
  useEffect(() => {
    getRoles();
  }, [dispatch]);
  return (
    <div>
      <Modal
        show={addUsershow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* User Add Form */}
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Col} controlId="formGridEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="first_name"
                type="name"
                value={person.first_name}
                placeholder="First Name"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridPassword">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="last_name"
                type="name"
                value={person.last_name}
                placeholder="Last Name"
                onChange={handleChange}
              />
            </Form.Group>
            <DatePicker
              name="date_of_birth"
              format="y-MM-dd"
              value={person.date_of_birth}
              onChange={(date) => {
                setPerson((prevState) => ({
                  ...prevState,
                  date_of_birth: date,
                }));
              }} //only when value has changed
            />
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Email</Form.Label>
              <Form.Control
                value={person.email}
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formGridAddress1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                value={person.username}
                name="username"
                type="name"
                placeholder="@Username"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>Role</Form.Label>
              <Form.Control
                onChange={(e) => {
                  setPerson((prevState) => ({
                    ...prevState,
                    role_id: parseInt(e.target.value),
                  }));
                  console.log(e.target.value);
                }}
                as="select"
                defaultValue="Choose..."
                name="role"
              >
                <option>Choise.....</option>
                {roles.map((role) => {
                  return (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Button
              style={{
                background: "blue",
                color: "white",
                marginLeft: "40%",
                marginRight: "50%",
                marginTop: "5%",
              }}
              variant="primary"
              type="submit"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </Form>
          {/* User Add Form */}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            className="btn btn-default"
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default React.memo(AddUserModal,isEqual);
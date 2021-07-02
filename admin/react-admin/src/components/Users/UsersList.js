import React, { useContext, useEffect, useRef, useState } from "react";
import { MyData } from "../Store";
import axios from "axios";
import { UserConst } from "../Store/Const/userConst";
import { Link } from "react-router-dom";
import { Table, Modal } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import { List, ListItem } from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
const UsersList = () => {
  const { state, dispatch } = useContext(MyData); //state value
  const getUsersData = async () => {
    try {
      dispatch({
        type: UserConst.ON_USERS_LIST_LOADING,
      });
      const response = await axios.get("users");
      const users = await response.data.data;
      dispatch({
        type: UserConst.ON_USERS_LIST_SUCCESS,
        payload: users,
      });
    } catch (error) {
      dispatch({
        type: UserConst.ON_USERS_LIST_FAIL,
      });
    }
  };
  useEffect(() => {
    getUsersData();
  }, []);

  const actions = (id) => {
    return (
      <>
        <Tooltip title="Delete" arrow>
          <Button variant="outlined">
            <DeleteIcon color="action" onClick={() => deleteHandler(id)}>
              Delete
            </DeleteIcon>
          </Button>
        </Tooltip>
        <Tooltip title="Edit" arrow>
          <Link to={`/users/${id}/edit`}>
            <Button variant="outlined">
              <EditIcon color="primary">Edit</EditIcon>
            </Button>
          </Link>
        </Tooltip>
      </>
    );
  };
  const deleteHandler = async (id) => {
    await axios.delete(`users/${id}`);
    setSearchData((people) => {
      return people.filter((person) => person.id !== id);
    });
    dispatch({
      type: UserConst.ON_USER_REMOVE,
      payload: id,
    });
  };
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(!show);
  };
  useEffect(() => {
    if (show === true) {
      inputRef.current.focus();
    }
  }, [show]);
  const [search, setSearch] = useState(""); // input field
  const [searchData, setSearchData] = useState([]); //the data what we want
  const url = `users?search=${search}`; //search URL
  return (
    <div>
      {state.loading ? (
        <h3>Loading....</h3>
      ) : state.error ? (
        <h3>Error</h3>
      ) : (
        <>
          <div className=" text-right">
            <Button onClick={handleShow}>Search</Button>
          </div>
          <div>
            <Modal
              keyboard={true}
              show={show}
              onHide={handleClose}
              backdrop="static"
            >
              <Modal.Header closeButton>
                <Modal.Title>Search User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input
                  ref={inputRef}
                  name="search"
                  onChange={async (e) => {
                    setSearch(() => e.target.value);
                    const response = await axios.get(url);
                    const data = await response.data.data;
                    setSearchData(data);
                  }}
                  value={search}
                />
                <List>
                  {searchData.map((data) => {
                    return (
                      <ListItem key={data.id}>
                        <ListItemAvatar>{actions(data.id)}</ListItemAvatar>
                        <ListItemText className="ml-2">
                          {data.email}
                        </ListItemText>
                        <ListItemText>@{data.username}</ListItemText>
                      </ListItem>
                    );
                  })}
                </List>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {user.first_name} {user.last_name}
                    </td>
                    <td>{user.email}</td>
                    <td>@{user.username}</td>
                    <td>{actions(user.id)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </>
      )}
    </div>
  );
};

export default UsersList;

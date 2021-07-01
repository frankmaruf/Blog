import React, { useContext, useEffect } from "react";
import { MyData } from "../Store";
import axios from "axios";
import { UserConst } from "../Store/Const/userConst";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
const UsersList = () => {
  const { state, dispatch } = useContext(MyData);

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
    dispatch({
      type: UserConst.ON_USER_REMOVE,
      payload: id,
    });
  };
  return (
    <div>
      {state.loading ? (
        <h3>Loading....</h3>
      ) : state.error ? (
        <h3>Error</h3>
      ) : (
        <>
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

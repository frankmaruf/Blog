import React, { useContext, useEffect, useState, useCallback } from "react";
import { MyData } from "../Store";
import axios from "axios";
import { UserConst } from "../Store/Const/userConst";
import { Link, Redirect } from "react-router-dom";
import { Table } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import SearchModal from "../Modal/SearchModal";
import AddUserModal from "../Modal/AddUserModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, listUsers } from "../actions/userAction";
const UsersList = () => {
  console.log("render UserList");
  const dispatche = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;
  useEffect(() => {
    //to list all users

    dispatche(listUsers());
  }, []);

  const actions = (id, callBack) => {
    //to get two button for delete and edit
    var noop = (callBack = () => {});
    return (
      <>
        <Tooltip title="Delete" arrow>
          <Button variant="outlined">
            <DeleteIcon color="action" onClick={() => deleteHandler(id, noop)}>
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
  const deleteHandler = async (id, callBack) => {
    var noop = (callBack = () => {});
    noop((people) => {
      return people.filter((person) => person.id !== id);
    });
    dispatche(deleteUser(id));
  };
  const [show, setShow] = useState(false);
  const [addUsershow, setAddUserShow] = useState(false); //props to add user modal
  const memoRizeSearchSetShow = useCallback(() => {
    setShow();
  }, [show, actions]);
  const memoRizeAddModal = useCallback(() => {
    setAddUserShow();
  }, [addUsershow]);
  const handleSearchShow = () => {
    setShow(!show);
  };
  const handleAddShow = () => {
    setAddUserShow(!addUsershow);
  };
  const userLogin = useSelector((state) => state.userLogin);
  const { user } = userLogin;
  if (!user) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      {loading ? (
        <h3>Loading....</h3>
      ) : error ? (
        <h3>Error</h3>
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-between ml-1 mr-1 mt-3">
            <button
              className="col-1 bg-primary text-white"
              onClick={handleAddShow}
            >
              Add User
            </button>
            <button
              className="col-1 bg-warning text-white"
              onClick={handleSearchShow}
            >
              Search
            </button>
          </div>
          {/* Search Modal */}
          <div>
            <SearchModal
              show={show}
              setShow={memoRizeSearchSetShow}
              actions={actions}
            />
          </div>

          {/* Add User */}
          <AddUserModal
            addUsershow={addUsershow}
            setAddUserShow={memoRizeAddModal}
          />

          {/* Users List */}
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Username</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
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
        </div>
      )}
    </div>
  );
};

export default React.memo(UsersList);

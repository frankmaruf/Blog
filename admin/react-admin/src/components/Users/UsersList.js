import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { MyData } from "../Store";
import axios from "axios";
import { UserConst } from "../Store/Const/userConst";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Tooltip from "@material-ui/core/Tooltip";
import SearchModal from "../Modal/SearchModal";
import AddUserModal from "../Modal/AddUserModal";
import {useDispatch,useSelector} from "react-redux"
import { AuthenticateUserDetail } from "../actions/userAction";
const UsersList = () => {
  const dispatche = useDispatch()
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
    //to list all users
    if (state.users) {
      getUsersData();
    }
  }, []);

  const actions = (id) => {
    //to get two button for delete and edit
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
  const [searchData, setSearchData] = useState([]); //the search data what we want
  const deleteHandler = async (id) => {
    //actully delete the users and dispatch the action
    await axios.delete(`users/${id}`);
    setSearchData((people) => {
      return people.filter((person) => person.id !== id);
    });
    dispatch({
      type: UserConst.ON_USER_REMOVE, //dispatch
      payload: id,
    });
  };
  const [show, setShow] = useState(false); //for modal control
  const [addUsershow, setAddUserShow] = useState(false); //for modal control
  const handleSearchShow = () => {
    //to handle the modal
    setShow(!show);
  };
  const handleAddShow = () => {
    setAddUserShow(!addUsershow);
  };
  return (
    <div>
      {state.loading ? (
        <h3>Loading....</h3>
      ) : state.error ? (
        <h3>Error</h3>
      ) : (
        <div className="container-fluid">
          <div className="row justify-content-between ml-1 mr-1 mt-3">
            <Button
              className="col-1 bg-primary text-white"
              onClick={handleAddShow}
            >
              Add User
            </Button>
            <Button
              className="col-1 bg-warning text-white"
              onClick={handleSearchShow}
            >
              Search
            </Button>
          </div>
          {/* Search Modal */}
          <div>
            <SearchModal
              searchData={searchData}
              setSearchData={setSearchData}
              show={show}
              setShow={setShow}
              actions={actions}
            />
          </div>

          {/* Add User */}
          <AddUserModal
            addUsershow={addUsershow}
            setAddUserShow={setAddUserShow}
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
              {state.users.map((user) => {
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

export default UsersList;

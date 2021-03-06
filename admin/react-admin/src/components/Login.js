import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "./actions/userAction";
import SignUpModal from "./Modal/SignUpModal";
export const Login = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const [signUpshow, setSignUpShow] = useState(false);
  const handleShow = () => setSignUpShow(!signUpshow);
  const { userJWT } = userLogin;
  useEffect(() => {
    if (userJWT) {
      <Redirect to="/" />;
    }
  }, [userJWT]);
  const initialState = {
    username: "",
    password: "",
  };
  const [data, setData] = React.useState(initialState);
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    setData({
      ...data,
    });
    dispatch(login(data.username, data.password));
  };
  if (userJWT) {
    return <Redirect to="/users" />;
  }
  return (
    <div className="login-container">
      <div className="card">
        <div className="container">
          <form onSubmit={handleFormSubmit}>
            <h1>Login</h1>

            <label htmlFor="username">
              username
              <input
                type="text"
                value={data.username}
                onChange={handleInputChange}
                name="username"
                id="username"
              />
            </label>

            <label htmlFor="password">
              Password
              <input
                type="password"
                value={data.password}
                onChange={handleInputChange}
                name="password"
                id="password"
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
        <div>
          <button onClick={handleShow}>SignUp</button>
          <SignUpModal
            handleShow={handleShow}
            signUpshow={signUpshow}
            setSignUpShow={setSignUpShow}
          />
        </div>
      </div>
    </div>
  );
};
export default Login;

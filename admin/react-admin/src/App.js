import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyNavbar from "./components/Navbar";
import MyFooter from "./components/Footer";
import Store from "./components/Store";
import UsersList from "./components/Users/UsersList";
import Test from "./components/Test";
import React from "react";
import Login from "./components/Login";
import Profile from "./components/Users/Profile";

function App() {
  return (
    <>
      <Router>
        <Store>
          <MyNavbar />
          <Switch>
            <Route exact component={UsersList} path="/users" />
            <Route exact component={Profile} path="/user" />
            <Route exact component={Test} path="/test" />
            <Route exact component={Login} path="/login" />
          </Switch>
        </Store>
        <MyFooter />
      </Router>
    </>
  );
}

export default App;

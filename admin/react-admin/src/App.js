import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyNavbar from "./components/Navbar";
import MyFooter from "./components/Footer";
import Store from "./components/Store";
import UsersList from "./components/Users/UsersList";
function App() {
  return (
    <Router>
      <MyNavbar />
      <Store>
        <Switch>
          <Route exact component={UsersList} path="/users" />
        </Switch>
      </Store>
      <MyFooter />
    </Router>
  );
}

export default App;

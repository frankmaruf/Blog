import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {userLoginReducers} from "./components/reducers/userReducers"
const reducer = combineReducers({
  userLogin: userLoginReducers,
});

const userJWTFromStorage = localStorage.getItem("userJWT")
  ? JSON.parse(localStorage.getItem("userJWT"))
  : null;

const AuthenticateUserFromStorage = localStorage.getItem("AuthenticateUser")
  ? JSON.parse(localStorage.getItem("AuthenticateUser"))
  : null;

  const initialState = {
  userLogin: { userJWT: userJWTFromStorage, user:AuthenticateUserFromStorage  },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
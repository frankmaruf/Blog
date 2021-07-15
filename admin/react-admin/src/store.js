import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import {userLoginReducers,authenticateUserDetailsReducer,
userListReducer,
userDeleteReducer
} from "./components/reducers/userReducers"
const reducer = combineReducers({
  userLogin: userLoginReducers,
  authenticateUser:authenticateUserDetailsReducer,
  userList:userListReducer,
  userDelete: userDeleteReducer
});

const userJWTFromStorage = localStorage.getItem("userJWT")
  ? JSON.parse(localStorage.getItem("userJWT"))
  : null;

const UserFromStorage = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
  const initialState = {
  userLogin: { userJWT: userJWTFromStorage,user:UserFromStorage },
};
const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
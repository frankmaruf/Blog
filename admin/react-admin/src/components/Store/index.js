import React, { createContext, useReducer } from "react";
import { BlogReducer } from "./Reducer/Reducer";

export const MyData = createContext();
const Store = ({ children }) => {
  const initialState = {
    posts: [],
    users: [],
    user: {},
    loading: true,
    error: false,
  };
  const [state, dispatch] = useReducer(BlogReducer, initialState);
  return (
    <MyData.Provider value={{ state, dispatch }}>{children}</MyData.Provider>
  );
};

export default React.memo(Store);

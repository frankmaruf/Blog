import React, { createContext, useEffect, useReducer } from "react";
import axios from "axios";
import { BlogReducer } from "./Reducer/Reducer";

const url = "http://localhost:8000/api/";
export const MyData = createContext();
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;
const Store = ({ children }) => {
  const initialState = {
    posts: [],
    users: [],
    user: {},
    loading: true,
    error: false,
    addUsers: async (value) => {
      const data = await axios.post(url, value);
      dispatch({
        type: "ADD_ARTICLE",
        payload: data,
      });
    },
    reset: () => {
      dispatch({
        type: "REST_ARTICLE",
      });
    },
  };
  const [state, dispatch] = useReducer(BlogReducer, initialState);
  return (
    <MyData.Provider value={{ state, dispatch }}>{children}</MyData.Provider>
  );
};

export default Store;

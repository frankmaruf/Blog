import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import App from "./App";
import axios from "axios";
import {Provider} from 'react-redux'
import store from "./store";
const url = "http://localhost:8000/api/";
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;
axios.defaults.headers.Authorization = `Bearer ${localStorage.getItem('userJWT')}`;
axios.defaults.headers.common['Authorization'] = localStorage.getItem('userJWT');
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;
ReactDOM.render(
<Provider store={store}>
<App />
</Provider>, document.getElementById("root"));

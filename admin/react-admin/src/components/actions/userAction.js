import {
    USER_LOGIN_SUCCESS,
    USER_LOGIN_REQUEST,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    AUTHENTICATE_USER_DETAILS_REQUEST,
    AUTHENTICATE_USER_DETAILS_SUCCESS,
    AUTHENTICATE_USER_DETAILS_FAIL,
    AUTHENTICATE_USER_DETAILS_RESET,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_RESET,
    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,
    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,
    USER_UPDATE_REQUEST,
    USER_UPDATE_SUCCESS,
    USER_UPDATE_FAIL,
}from "../const/userConst"

import axios from "axios"
export const login = (username, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const response = await axios.post(
            'login',
            { 'username': username, 'password': password },
            config
        )
        const jwt = response.data.jwt

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: jwt
        })

        localStorage.setItem('userJWT', JSON.stringify(jwt))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const AuthenticateUserDetail = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: AUTHENTICATE_USER_DETAILS_REQUEST
        })
        const jwt = getState().userLogin.userJWT
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${jwt}`
            }
        }

        const response = await axios.get(
            'user',
            config
        )
        const user = response.data.data

        dispatch({
            type: AUTHENTICATE_USER_DETAILS_SUCCESS,
            payload: user
        })
        localStorage.setItem('user', JSON.stringify(user))
    } catch (error) {
        dispatch({
            type: AUTHENTICATE_USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(
            `/api/users/${id}/`,
            config
        )

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        })
    }
}



export const logout =() => async (dispatch) => {
    localStorage.removeItem('userJWT')
    localStorage.removeItem('user')
    await axios.post('logout', {});
    dispatch(
        {
            type: USER_LOGOUT
        }
    )
    dispatch({
            type: AUTHENTICATE_USER_DETAILS_RESET
        })
    
}
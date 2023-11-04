import axios from "axios";
import * as types from "./actionTypes";

const signup = (payload) => (dispatch) => {
  dispatch({ type: types.SIGNUP_REQUEST });
  return axios
    .post("https://fine-blue-turkey-veil.cyclic.app/user/signup", payload)
    .then((res) => {
      return dispatch({ type: types.SIGNUP_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.SIGNUP_FAILURE, payload: err });
    });
};

const login = (payload) => (dispatch) => {
  dispatch({ type: types.LOGIN_REQUEST });
  return axios
    .post("https://fine-blue-turkey-veil.cyclic.app/user/login", payload)
    .then((res) => {
      return dispatch({ type: types.LOGIN_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.LOGIN_FAILURE, payload: err });
    });
};

const getProfile = (token) => (dispatch) => {
  dispatch({ type: types.GET_PROFILE_REQUEST });
  return axios
    .get("https://fine-blue-turkey-veil.cyclic.app/user/profile", {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return dispatch({ type: types.GET_PROFILE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.GET_PROFILE_FAILURE, payload: err });
    });
};

const updateProfile = (payload, token) => (dispatch) => {
  dispatch({ type: types.UPDATE_PROFILE_REQUEST });
  return axios
    .patch("https://fine-blue-turkey-veil.cyclic.app/user/profile/update",payload, {
      headers: {
        Authorization: token,
      },
    })
    .then((res) => {
      return dispatch({ type: types.UPDATE_PROFILE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      return dispatch({ type: types.UPDATE_PROFILE_FAILURE, payload: err });
    });
};



export { signup, login, getProfile, updateProfile };

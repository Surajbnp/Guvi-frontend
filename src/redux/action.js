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

export { signup, login };

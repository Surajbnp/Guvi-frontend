import * as types from "./actionTypes";

let initialState = {
  profile: {},
  isLoading: false,
  isErr: false,
};

const reducer = (state = initialState, action) => {
  let { type, payload } = action;

  switch (type) {
    case types.SIGNUP_REQUEST:
      return {
        isLoading: true,
        isErr: false,
      };

    case types.SIGNUP_SUCCESS:
      return {
        isLoading: false,
        isErr: false,
      };

    case types.SIGNUP_FAILURE:
      return {
        isLoading: false,
        isErr: true,
      };

      case types.LOGIN_REQUEST:
        return {
          isLoading: true,
          isErr: false,
        };
  
      case types.LOGIN_SUCCESS:
        return {
          isLoading: false,
          isErr: false,
        };
  
      case types.LOGIN_FAILURE:
        return {
          isLoading: false,
          isErr: true,
        };

    default: {
      return state;
    }
  }
};

export default reducer;

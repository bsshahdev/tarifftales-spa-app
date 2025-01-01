import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes";

const initialState = {
  error: "",
  loading: false,
  login_user_data: {},
};

const Login = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: 
    {
      state = {
        ...state,
        loading: true,
      };
      console.log('========= Hello World')
      break;
    }
    case LOGIN_SUCCESS:
      state = {
        ...state,
        loading: false,
        login_user_data: action.payload
      };
      break;
    case LOGOUT_USER:
      state = { ...state };
      break;
    case LOGOUT_USER_SUCCESS:
      state = { ...state };
      break;
    case API_ERROR:
      state = { ...state, error: action.payload, loading: false };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Login;

import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_SUCCESS, LOGIN_USER, LOGOUT_USER, SOCIAL_LOGIN } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
  postSocialLogin,
} from "../../../helpers/fakebackend_helper";
import { LoginAPI, loginpost } from "../../../helpers/services/AuthService";
import { showErrorToast, showSuccessToast } from "../../../components/Common/CustomToast";
import { GET_INQUIRY_SUMMARY_DATA } from "../../Sales/actiontype";

const fireBaseBackend = getFirebaseBackend();

// function* loginUser({ payload: { user, history } }) {
//   console.log('=========== inside login user eage');
//   console.log('==========');
//   console.log(process.env.REACT_APP_DEFAULTAUTH );
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//             const response = yield call(
//         fireBaseBackend.loginUser,
//         user.email,
//         user.password
//       );
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "jwt") {
//             const response = yield call(postJwtLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     } else if (process.env.REACT_APP_DEFAULTAUTH === "fake") {
//       console.log('====== Inside fack');
//       const response = yield call(postFakeLogin, {
//         email: user.email,
//         password: user.password,
//       });
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     }
//     history("/dashboard")
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* loginUser({ payload: { dataObj, history } }){
  try{
    const response = yield call(LoginAPI, dataObj)
    console.log("response", response)
    localStorage.setItem("token", JSON.stringify(response?.data?.jwtToken));
    localStorage.setItem("authUser", JSON.stringify(response?.data));
    showSuccessToast("Login User Successfully");
    yield put({type: LOGIN_SUCCESS, payload: response.data});
    yield put({type: GET_INQUIRY_SUMMARY_DATA});
    history("/dashboard");
  } catch (error) {
    showErrorToast(error?.response?.data?.message);
    console.log(error,"saga login api error")
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");
    if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

// function* socialLogin({ payload: { data, history, type } }) {
//   try {
//     if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
//       const fireBaseBackend = getFirebaseBackend();
//       const response = yield call(fireBaseBackend.socialLoginUser, data, type);
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     } else {
//       const response = yield call(postSocialLogin, data);
//       localStorage.setItem("authUser", JSON.stringify(response));
//       yield put(loginSuccess(response));
//     }
//     history.push("/dashboard")
//   } catch (error) {
//     yield put(apiError(error));
//   }
// }

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  // yield takeLatest(SOCIAL_LOGIN, socialLogin);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;

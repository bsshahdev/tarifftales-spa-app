import { all, fork } from "redux-saga/effects"

//public
import AccountSaga from "./auth/register/saga"
import AuthSaga from "./auth/login/saga"
import ForgetSaga from "./auth/forgetpwd/saga"
import ProfileSaga from "./auth/profile/saga"
import LayoutSaga from "./layout/saga"
import calendarSaga from "./calendar/saga"
import chatSaga from "./chat/saga"
import invoiceSaga from "./invoices/saga"
import contactsSaga from "./contacts/saga";
//import dashboard
import dashBoardSaga from "./Dashboard/saga"
import procurementSaga from "./Procurement/saga"
import salesSaga from "./Sales/saga"
import rateManagementSaga from "./RateManagement/saga"
import settingsSaga from "./Settings/saga"
import partiesSaga from "./Parties/saga"
import globalSaga from "./Global/saga"
import partiesCustomerSaga from "./Parties/Customer/saga"
import partiesVendorSaga from "./Parties/Vendor/saga"
import instantRateSaga from "./InstantRate/saga"

export default function* rootSaga() {
  yield all([
    //public
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(chatSaga),
    fork(invoiceSaga),
    fork(contactsSaga),
    fork(dashBoardSaga),
    fork(procurementSaga),
    fork(salesSaga),
    // fork(rateManagementSaga),
    fork(settingsSaga),
    fork(partiesSaga),
    fork(globalSaga),
    fork(partiesCustomerSaga),
    fork(partiesVendorSaga),
    fork(instantRateSaga),
  ])
}

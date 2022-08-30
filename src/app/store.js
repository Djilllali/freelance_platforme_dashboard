import { configureStore } from "@reduxjs/toolkit";
import signinReducer from "../features/signin/signinSlice";
import usersReducer from "../features/users/usersSlice";
import jobsReducer from "../features/jobs/jobsSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import singleUser from "../features/user/userSlice";

export default configureStore({
  reducer: {
    signin: signinReducer,
    users: usersReducer,
    dashboard: dashboardReducer,
    jobs: jobsReducer,
  },
});

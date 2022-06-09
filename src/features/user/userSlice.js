// import { createSlice } from "@reduxjs/toolkit";
// import {
//   getSingleUserUrl,
//   updateUserUrl,
//   getSingleSubscriptionUrl,
//   getSinglePlanUrl,
//   upgradePlanUrl,
//   editClientsUrl,
// } from "../../Constants";
// import { message } from "antd";
// import axios from "axios";

// export const SingleUserSlice = createSlice({
//   name: "singleUser",
//   initialState: {
//     fetchSingleUserResult: null,
//     fetchSingleUserError: null,
//     isFetchingSingleUser: false,
//   },
//   reducers: {
//     setfetchSingleUserResult: (state, action) => {
//       state.fetchSingleUserResult = action.payload;
//       state.isFetchingSingleUser = false;
//     },
//     setfetchSingleUserError: (state, action) => {
//       state.fetchSingleUserError = action.payload;
//       state.isFetchingSingleUser = false;
//     },
//     setisFetchingSingleUser: (state, action) => {
//       state.isFetchingSingleUser = action.payload;
//     },
//     setFilters: (state, action) => {
//       state.filters = action.payload;
//     },

//     setPage: (state, action) => {
//       state.page = action.payload;
//     },
//     setselectedDateType: (state, action) => {
//       state.selectedDateType = action.payload;
//     },

//     setdatefrom: (state, action) => {
//       state.from_date = action.payload;
//     },
//     setdateto: (state, action) => {
//       state.to_date = action.payload;
//     },
//   },
// });

// export const {
//   setfetchSingleUserResult,
//   setfetchSingleUserError,
//   setisFetchingSingleUser,
// } = SingleUserSlice.actions;

// export const fetchSingleUser = (data) => (dispatch, getState) => {
//   const config = {
//     method: "post",
//     url: getSingleUserUrl,
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: localStorage.token,
//     },
//     data,
//   };
//   dispatch(setisFetchingSingleUser(true));
//   const response = axios(config)
//     .then((response) => {
//       dispatch(setfetchSingleUserResult(response.data));
//     })
//     .catch((response) => {
//       dispatch(setfetchSingleUserError(response.message));
//       message.error("Error while fetching Single user");
//     });
//   return response.data;
// };

// export default SingleUserSlice.reducer;

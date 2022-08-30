import { createSlice } from "@reduxjs/toolkit";

import { getAlljobs, readyAllJobsUrl, CreateJobUrl } from "../../Constants";
import axios from "axios";
import { message } from "antd";
import { act } from "@testing-library/react";

const initState = {
  fetchAllJobsResult: null,
  fetchAllJobsError: null,
  isFetchingAllJobs: false,
  value: 2,
  pathname: "/",
  nbreOfDocs: 0,
  filters: null,
  page: 1,
};

export const JobsSlice = createSlice({
  name: "AllJobs",
  initialState: initState,
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setAllJobsResult: (state, action) => {
      state.fetchAllJobsResult = action.payload;
      if (action.payload.nbreOfDocs)
        state.nbreOfDocs = action.payload.nbreOfDocs;
      state.isFetchingAllJobs = false;
    },
    setAllJobsError: (state, action) => {
      state.fetchAllJobsError = action.payload;
      state.isFetchingAllJobs = false;
    },
    setFetchingAllJobs: (state, action) => {
      if (action.payload) {
        state.fetchAllJobsError = null;
        state.fetchAllJobsResult = null;
      }
      state.isFetchingAllJobs = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  setPathname,
  setAllJobsResult,
  setAllJobsError,
  setFetchingAllJobs,
  setFilters,
  setPage,
} = JobsSlice.actions;

export const fetchAllJobs = (data) => (dispatch, getState) => {
  const config = {
    method: "get",
    url: getAlljobs,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  dispatch(setFetchingAllJobs(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setAllJobsResult(response.data));
    })
    .catch((response) => {
      dispatch(setAllJobsError(response.message));
    });

  return response.data;
};
// --------------------------------------------
// --------------------------------------------
export const AddnewJob = (data) => async (dispatch, getState) => {
  const config = {
    method: "post",
    url:CreateJobUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      message.success("Job added successfully");
      dispatch(fetchAllJobs());
    })
    .catch((response) => {
      message.error("Error while adding the job ");
    });

  return response;
};
// ---------------------------------------------------------------------
// --------------------------------------------------------------------

export const selectCount = (state) => state.dashboard.value;

export default JobsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import { getSinglejobUrl, updateJobUrl, deleteJobUrl } from "../../Constants";
import axios from "axios";
import { message } from "antd";
import { act } from "@testing-library/react";

const initState = {
  fetchSinglejobResult: null,
  fetchjobsError: null,
  isFetchingNewjobs: false,
  value: 2,
  pathname: "/",
  nbreOfDocs: 0,
  filters: null,
  page: 1,
};

export const singlejobSlice = createSlice({
  name: "singlejob",
  initialState: initState,
  reducers: {
    setSingleJobResult: (state, action) => {
      state.fetchSinglejobResult = action.payload;
      if (action.payload.nbreOfDocs)
        state.nbreOfDocs = action.payload.nbreOfDocs;
      state.isFetchingNewjobs = false;
    },
    setSingleJobsError: (state, action) => {
      state.fetchjobsError = action.payload;
      state.isFetchingNewjobs = false;
    },
    setFetchingSingleJobs: (state, action) => {
      if (action.payload) {
        state.fetchjobsError = null;
        state.fetchSinglejobResult = null;
      }
      state.isFetchingNewjobs = action.payload;
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
  setFilters,
  setPage,
  setSingleJobResult,
  setFetchingSingleJobs,
  setSingleJobsError,
} = singlejobSlice.actions;

export const fetchSinglejob = (data) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: getSinglejobUrl + data._id,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("start fetching ...", data);
  dispatch(setFetchingSingleJobs(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setSingleJobResult(response.data));
      console.log("single job", response.data);
      message.success("job fetched successfully");
    })
    .catch((response) => {
      dispatch(setSingleJobsError(response.message));
      message.error("Error while fetching single job ");
    });

  console.log("end fetching ...");
  console.log(response);
  return response.data;
};

// ---------------------------------------------------------------------
// --------------------------------------------------------------------
export const updateJob = (data) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: updateJobUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  console.log("jajajajaaj", data);
  const response = axios(config)
    .then((response) => {
      message.success("Job updated successfully");
      dispatch(fetchSinglejob({ _id: response.data.data }));
    })
    .catch((response) => {
      message.error("Error while updating job");
    });

  return response.data;
};
// --------------------------------------------
export const deleteJob = (data) => async (dispatch, getState) => {
  const config = {
    method: "post",
    url: deleteJobUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      message.success("Job deleted successfully");
    })
    .catch((response) => {
      message.error("Error while deleting the job ");
    });

  return response;
};
// --------------------------------------------
// --------------------------------------------

export const selectCount = (state) => state.dashboard.value;

export default singlejobSlice.reducer;

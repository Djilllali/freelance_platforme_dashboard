import { createSlice } from "@reduxjs/toolkit";

import {
  getAllUsers,
  getAllDomainsUrl,
  getAllPacksUrl,
  createUserUrl,
  updateUser,
} from "../../Constants";
import axios from "axios";
import { message } from "antd";
import { act } from "@testing-library/react";

const initState = {
  fetchAllUsersResult: null,
  fetchAllUsersError: null,
  isFetchingAllUsers: false,

  fetchAllDomainsResult: null,
  fetchAllDomainsError: null,
  isFetchingAllDomains: false,

  fetchAllPacksResult: null,
  fetchAllPacksError: null,
  isFetchingAllPacks: false,
  value: 2,
  pathname: "/",
  nbreOfDocs: 0,
  filters: null,
  page: 1,
};

export const usersSlice = createSlice({
  name: "AllUsers",
  initialState: initState,
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setAllUsersResult: (state, action) => {
      state.fetchAllUsersResult = action.payload;
      if (action.payload.nbreOfDocs)
        state.nbreOfDocs = action.payload.nbreOfDocs;
      state.isFetchingAllUsers = false;
    },
    setAllUsersError: (state, action) => {
      state.fetchAllUsersError = action.payload;
      state.isFetchingAllUsers = false;
    },
    setFetchingAllUsers: (state, action) => {
      if (action.payload) {
        state.fetchAllUsersError = null;
        state.fetchAllUsersResult = null;
      }
      state.isFetchingAllUsers = action.payload;
    },

    setAllDomainsResult: (state, action) => {
      state.fetchAllDomainsResult = action.payload;
      if (action.payload.nbreOfDocs)
        state.nbreOfDocs = action.payload.nbreOfDocs;
      state.isFetchingAllDomains = false;
    },
    setAllDomainsError: (state, action) => {
      state.fetchAllDomainsError = action.payload;
      state.isFetchingAllDomains = false;
    },
    setFetchingAllDomains: (state, action) => {
      if (action.payload) {
        state.fetchAllDomainsError = null;
        state.fetchAllDomainsResult = null;
      }
      state.isFetchingAllDomains = action.payload;
    },

    setAllPacksResult: (state, action) => {
      state.fetchAllPacksResult = action.payload;
      if (action.payload.nbreOfDocs)
        state.nbreOfDocs = action.payload.nbreOfDocs;
      state.isFetchingAllPacks = false;
    },
    setAllPacksError: (state, action) => {
      state.fetchAllPacksError = action.payload;
      state.isFetchingAllPacks = false;
    },
    setFetchingAllPacks: (state, action) => {
      if (action.payload) {
        state.fetchAllPacksError = null;
        state.fetchAllPacksResult = null;
      }
      state.isFetchingAllPacks = action.payload;
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
  setAllUsersResult,
  setAllUsersError,
  setFetchingAllUsers,

  setAllDomainsResult,
  setAllDomainsError,
  setFetchingAllDomains,

  setAllPacksResult,
  setAllPacksError,
  setFetchingAllPacks,
  setFilters,
  setPage,
} = usersSlice.actions;

export const fetchAllUsers = (data) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: getAllUsers,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  dispatch(setFetchingAllUsers(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setAllUsersResult(response.data));
    })
    .catch((response) => {
      dispatch(setAllUsersError(response.message));
    });

  return response.data;
};

// --------------------------------------------
// --------------------------------------------
export const fetchAllDomains = (data) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: getAllDomainsUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  dispatch(setFetchingAllDomains(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setAllDomainsResult(response.data));
    })
    .catch((response) => {
      dispatch(setAllDomainsError(response.message));
    });

  return response.data;
};
// --------------------------------------------
// --------------------------------------------
export const fetchAllPacks = (data) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: getAllPacksUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  dispatch(setFetchingAllPacks(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setAllPacksResult(response.data));
    })
    .catch((response) => {
      dispatch(setAllPacksError(response.message));
    });

  return response.data;
};
// --------------------------------------------
// --------------------------------------------
export const CreateUser = (data) => async (dispatch, getState) => {
  const config = {
    method: "post",
    url: createUserUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      message.success("User created successfully");
      dispatch(fetchAllUsers());
    })
    .catch((response) => {
      message.error(response.message);
    });

  return response;
};
// ---------------------------------------------------------------------
// --------------------------------------------------------------------

// --------------------------------------------
// --------------------------------------------
export const UpdateUser = (data) => async (dispatch, getState) => {
  const config = {
    method: "post",
    url: updateUser,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  console.log("data", data);
  const response = await axios(config)
    .then((response) => {
      message.success("User updated successfully");
      dispatch(fetchAllUsers());
    })
    .catch((response) => {
      console.log("error eror oror", response);
      message.error("Error while updating user");
    });

  return response;
};
// ---------------------------------------------------------------------
// --------------------------------------------------------------------

export const selectCount = (state) => state.dashboard.value;

export default usersSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import { updateDownloadedStatusUrl } from "../../Constants";
import axios from "axios";
import { message } from "antd";
import { act } from "@testing-library/react";

const initState = {
  value: 2,
  pathname: "/",
  nbreOfDocs: 0,
  filters: null,
  page: 1,
};

export const singleTicketSlice = createSlice({
  name: "singleTicket",
  initialState: initState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setFilters, setPage } = singleTicketSlice.actions;

// ---------------------------------------------------------------------
// --------------------------------------------------------------------
export const updateDownloadedStatus = (data) => (dispatch, getState) => {
  const config = {
    method: "patch",
    url: updateDownloadedStatusUrl + data._id,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("jajajajaaj", data);
  const response = axios(config)
    .then((response) => {
      message.success("downloaded updated avec succes");
    })
    .catch((response) => {
      message.error("error while updating downloaded");
    });

  return response.data;
};

export const selectCount = (state) => state.dashboard.value;

export default singleTicketSlice.reducer;

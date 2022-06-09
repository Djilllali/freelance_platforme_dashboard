import { createSlice } from "@reduxjs/toolkit";

import { ticketsEncoursUrl, updateTicketsEnCoursUrl } from "../../Constants";
import axios from "axios";
import { message } from "antd";
import { act } from "@testing-library/react";

const initState = {
  fetchTicketsResult: null,
  fetchTicketsError: null,
  isFetchingEncoursTickets: false,
  updateTicket: false,
  value: 2,
  pathname: "/",
  nbreOfDocs: 0,
  filters: null,
  page: 1,
};

export const ticketsSlice = createSlice({
  name: "Tickets",
  initialState: initState,
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setEncoursTicketsResult: (state, action) => {
      state.fetchTicketsResult = action.payload;
      if (action.payload.nbreOfDocs)
        state.nbreOfDocs = action.payload.nbreOfDocs;
      state.isFetchingEncoursTickets = false;
    },
    setEncoursTicketsError: (state, action) => {
      state.fetchTicketsError = action.payload;
      state.isFetchingEncoursTickets = false;
    },
    setFetchingEncoursTickets: (state, action) => {
      if (action.payload) {
        state.fetchTicketsError = null;
        state.fetchTicketsResult = null;
      }
      state.isFetchingEncoursTickets = action.payload;
    },
    SetUpdateTicketStatus: (state, action) => {
      state.updateTicketStatus = true;
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
  setEncoursTicketsResult,
  setEncoursTicketsError,
  setFetchingEncoursTickets,
  SetUpdateTicketStatus,
  setFilters,
  setPage,
} = ticketsSlice.actions;

export const fetchEncoursTickets = (data) => (dispatch, getState) => {
  const config = {
    method: "get",
    url: ticketsEncoursUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  dispatch(setFetchingEncoursTickets(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setEncoursTicketsResult(response.data));
    })
    .catch((response) => {
      dispatch(setEncoursTicketsError(response.message));
    });

  return response.data;
};
// --------------------------------------------
// --------------------------------------------
export const updateTicketsEnCours = (data) => (dispatch, getState) => {
  const config = {
    method: "patch",
    url: updateTicketsEnCoursUrl + data._id,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };

  const response = axios(config)
    .then((response) => {
      message.success("updated successfully");
      dispatch(SetUpdateTicketStatus());
    })
    .catch((response) => {
      message.error("error while updating status");
    });

  return response.data;
};
// ---------------------------------------------------------------------
// --------------------------------------------------------------------

export const selectCount = (state) => state.dashboard.value;

export default ticketsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

import { newTicketsUrl, ticketsTerminesUrl } from "../../Constants";
import axios from "axios";
import { message } from "antd";
import { act } from "@testing-library/react";

const initState = {
  fetchTicketsResult: null,
  fetchTicketsError: null,
  isFetchingNewTickets: false,
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
    setNewTicketsResult: (state, action) => {
      state.fetchTicketsResult = action.payload;
      if (action.payload.nbreOfDocs)
        state.nbreOfDocs = action.payload.nbreOfDocs;
      state.isFetchingNewTickets = false;
    },
    setNewTicketsError: (state, action) => {
      state.fetchTicketsError = action.payload;
      state.isFetchingNewTickets = false;
    },
    setFetchingNewTickets: (state, action) => {
      if (action.payload) {
        state.fetchTicketsError = null;
        state.fetchTicketsResult = null;
      }
      state.isFetchingNewTickets = action.payload;
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
  setNewTicketsResult,
  setNewTicketsError,
  setFetchingNewTickets,
  SetUpdateTicketStatus,
  setFilters,
  setPage,
} = ticketsSlice.actions;

export const fetchTermineTickets = (data) => (dispatch, getState) => {
  const config = {
    method: "get",
    url: ticketsTerminesUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  dispatch(setFetchingNewTickets(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setNewTicketsResult(response.data));
    })
    .catch((response) => {
      dispatch(setNewTicketsError(response.message));
    });

  return response.data;
};
// --------------------------------------------

export const selectCount = (state) => state.dashboard.value;

export default ticketsSlice.reducer;

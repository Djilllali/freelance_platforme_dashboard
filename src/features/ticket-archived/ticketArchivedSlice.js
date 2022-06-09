import { createSlice } from "@reduxjs/toolkit";

import { ticketsUrl, archivedTicketsUrl } from "../../Constants";
import axios from "axios";
import { message } from "antd";
import { act } from "@testing-library/react";

const initState = {
  fetchTicketsResult: null,
  fetchTicketsError: null,
  isFetchingTickets: false,
  value: 2,
  pathname: "/",
  nbreOfDocs: 0,
  filters: null,
  page: 1,
};

export const usersSlice = createSlice({
  name: "Tickets",
  initialState: initState,
  reducers: {
    setPathname: (state, action) => {
      state.pathname = action.payload;
    },
    setTicketsResult: (state, action) => {
      state.fetchTicketsResult = action.payload;
      if (action.payload.nbreOfDocs)
        state.nbreOfDocs = action.payload.nbreOfDocs;
      state.isFetchingTickets = false;
    },
    setTicketsError: (state, action) => {
      state.fetchTicketsError = action.payload;
      state.isFetchingTickets = false;
    },
    setFetchingTickets: (state, action) => {
      if (action.payload) {
        state.fetchTicketsError = null;
        state.fetchTicketsResult = null;
      }
      state.isFetchingTickets = action.payload;
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
  setTicketsResult,
  setTicketsError,
  setFetchingTickets,
  setFilters,
  setPage,
} = usersSlice.actions;

export const fetchTickets = (data) => (dispatch, getState) => {
  const config = {
    method: "get",
    url: archivedTicketsUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  dispatch(setFetchingTickets(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setTicketsResult(response.data));
    })
    .catch((response) => {
      dispatch(setTicketsError(response.message));
    });

  return response.data;
};
// --------------------------------------------
// --------------------------------------------
export const AddnewTicket = (data) => async (dispatch, getState) => {
  const config = {
    method: "post",
    url: ticketsUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };

  const response = await axios(config)
    .then((response) => {
      message.success("Ticket added successfully");
      dispatch(fetchTickets());
    })
    .catch((response) => {
      message.error("Error while adding the ticket ");
    });

  return response;
};
// ---------------------------------------------------------------------
// --------------------------------------------------------------------

export const selectCount = (state) => state.dashboard.value;

export default usersSlice.reducer;

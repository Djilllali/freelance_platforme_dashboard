import { createSlice } from "@reduxjs/toolkit";

import {
  getSingleTicketUrl,
  uploadZipFileUrl,
  updateTicketsCloseUrl,
} from "../../Constants";
import axios from "axios";
import { message } from "antd";
import { act } from "@testing-library/react";

const initState = {
  fetchSingleTicketResult: null,
  fetchTicketsError: null,
  isFetchingNewTickets: false,
  fetchUploadZipFileResult: null,
  fetchUploadZipFileError: null,
  isFetchingUploadZipFile: false,
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
    setSingleTicketResult: (state, action) => {
      state.fetchSingleTicketResult = action.payload;
      state.isFetchingSingleTicket = false;
    },
    setSingleTicketError: (state, action) => {
      state.fetchSingleTicketError = action.payload;
      state.isFetchingSingleTicket = false;
    },
    setFetchingSingleTicket: (state, action) => {
      if (action.payload) {
        state.fetchSingleTicketError = null;
        state.fetchSingleTicketResult = null;
      }
      state.isFetchingSingleTicket = action.payload;
    },
    setUploadZipFileResult: (state, action) => {
      state.fetchUploadZipFileResult = action.payload;
      state.isFetchingUploadZipFile = false;
    },
    setUploadZipFileError: (state, action) => {
      state.fetchUploadZipFileError = action.payload;
      state.isFetchingUploadZipFile = false;
    },
    setFetchingUploadZipFile: (state, action) => {
      if (action.payload) {
        state.fetchUploadZipFileResult = null;
        state.fetchUploadZipFileError = null;
      }
      state.isFetchingUploadZipFile = action.payload;
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
  setSingleTicketResult,
  setSingleTicketError,
  setFetchingSingleTicket,
  setUploadZipFileResult,
  setUploadZipFileError,
  setFetchingUploadZipFile,
  setFilters,
  setPage,
} = singleTicketSlice.actions;

export const fetchSingleTicket = (data) => (dispatch, getState) => {
  const config = {
    method: "get",
    url: getSingleTicketUrl + data._id,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
  };
  console.log("start fetching ...", data);
  dispatch(setFetchingSingleTicket(true));

  const response = axios(config)
    .then((response) => {
      dispatch(setSingleTicketResult(response.data));
      console.log("single ticket", response.data);
      message.success("Ticket fetched successfully");
    })
    .catch((response) => {
      dispatch(setSingleTicketError(response.message));
      message.error("Error while fetching single ticket ");
    });

  console.log("end fetching ...");
  console.log(response);
  return response.data;
};

// ---------------------------------------------------------------------
// --------------------------------------------------------------------
export const updateTicketFIle = (data) => (dispatch, getState) => {
  const config = {
    method: "post",
    url: updateTicketsCloseUrl,
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.token,
    },
    data,
  };
  console.log("close data", data);
  const response = axios(config)
    .then((response) => {
      message.success("Ticket terminé avec succes");
    })
    .catch((response) => {
      message.error("error while ending ticket");
    });

  return response.data;
};
// ---------------------------------------------------------------------
// --------------------------------------------------------------------
export const fetchUploadZipFile = (file) => (dispatch, getState) => {
  let formData = new FormData();
  formData.append("upload", file);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.token,
    },
  };

  dispatch(setFetchingUploadZipFile(true));
  let url = uploadZipFileUrl;
  let response = axios
    .post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: localStorage.token,
      },
    })
    .then((response) => {
      dispatch(setUploadZipFileResult(response.data.path));
      message.success("Votre fichier zip a été uploadé avec succès !");
    })
    .catch((response) => {
      dispatch(setUploadZipFileError(response.message));
      console.log("slice error");
    });

  return response.data;
};
// ---------------------------------------------------------------------
// --------------------------------------------------------------------

export const selectCount = (state) => state.dashboard.value;

export default singleTicketSlice.reducer;

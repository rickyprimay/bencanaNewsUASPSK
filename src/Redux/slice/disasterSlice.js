import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../utils/network"

const initialState = {
  disasters: [],
  disasterDetail: null,
  loading: false,
  error: null,
};

const disasterSlice = createSlice({
  name: "disasters",
  initialState,
  reducers: {
    fetchDisastersStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDisastersSuccess: (state, action) => {
      state.loading = false;
      state.disasters = action.payload;
    },
    fetchDisastersFail: (state) => {
      state.loading = false;
      state.error = "Failed to load disasters";
      Swal.fire("Error", "Failed to load disaster data.", "error");
    },
    fetchDisasterDetailStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDisasterDetailSuccess: (state, action) => {
      state.loading = false;
      state.disasterDetail = action.payload;
    },
    fetchDisasterDetailFail: (state) => {
      state.loading = false;
      state.error = "Failed to load disaster detail";
      Swal.fire("Error", "Failed to load disaster detail.", "error");
    },
  },
});

export const {
  fetchDisastersStart,
  fetchDisastersSuccess,
  fetchDisastersFail,
  fetchDisasterDetailStart,
  fetchDisasterDetailSuccess,
  fetchDisasterDetailFail,
} = disasterSlice.actions;

export const fetchDisasters = () => async (dispatch) => {
  dispatch(fetchDisastersStart());
  try {
    const response = await axios.get(`${BASE_URL}/disasters`);
    dispatch(fetchDisastersSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchDisastersFail());
  }
};

export const fetchDisasterDetail = (id) => async (dispatch) => {
  dispatch(fetchDisasterDetailStart());
  try {
    const response = await axios.get(`${BASE_URL}/disasters/${id}`);
    dispatch(fetchDisasterDetailSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchDisasterDetailFail());
  }
};

export default disasterSlice.reducer;

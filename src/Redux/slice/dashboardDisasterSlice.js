import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  totalNews: 0,
  totalAllNews: 0,
  loading: false,
  error: null,
};

const dashboardDisasterSlice = createSlice({
  name: "dashboardDisasters",
  initialState,
  reducers: {
    fetchDisasterCountsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchDisasterCountsSuccess: (state, action) => {
      state.loading = false;
      state.totalNews = action.payload.totalNews;
      state.totalAllNews = action.payload.totalAllNews;
    },
    fetchDisasterCountsFail: (state) => {
      state.loading = false;
      state.error = "Failed to load disaster counts";
      Swal.fire("Error", "Failed to load disaster count data.", "error");
    },
  },
});

export const {
  fetchDisasterCountsStart,
  fetchDisasterCountsSuccess,
  fetchDisasterCountsFail,
} = dashboardDisasterSlice.actions;

export const fetchDisasterCounts = () => async (dispatch) => {
  dispatch(fetchDisasterCountsStart());
  try {
    const token = localStorage.getItem("token");
    const [userNewsResponse, allNewsResponse] = await Promise.all([
      axios.get("http://127.0.0.1:8000/api/count-disaster", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get("http://127.0.0.1:8000/api/count-all-disaster", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    ]);

    const userNewsData = userNewsResponse.data;
    const allNewsData = allNewsResponse.data;

    if (userNewsData.status && allNewsData.status) {
      dispatch(
        fetchDisasterCountsSuccess({
          totalNews: userNewsData.data,
          totalAllNews: allNewsData.data,
        })
      );
    } else {
      dispatch(fetchDisasterCountsFail());
    }
  } catch (error) {
    dispatch(fetchDisasterCountsFail());
  }
};

export default dashboardDisasterSlice.reducer;

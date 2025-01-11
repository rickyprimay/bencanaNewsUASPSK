import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../utils/network"

const initialState = {
  totalNews: 0,
  totalAllNews: 0,
  loading: false,
  error: null,
  news: [],
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
    fetchNewsSuccess: (state, action) => {
      state.loading = false;
      state.news = action.payload;
    },
    fetchNewsFail: (state) => {
      state.loading = false;
      state.error = "Failed to load news data";
      Swal.fire("Error", "Failed to load news data.", "error");
    },
  },
});

export const {
  fetchDisasterCountsStart,
  fetchDisasterCountsSuccess,
  fetchDisasterCountsFail,
  fetchNewsSuccess,
  fetchNewsFail,
} = dashboardDisasterSlice.actions;

export const fetchDisasterCounts = () => async (dispatch) => {
  dispatch(fetchDisasterCountsStart());
  try {
    const token = localStorage.getItem("token");
    const [userNewsResponse, allNewsResponse] = await Promise.all([
      axios.get(`${BASE_URL}/count-disaster`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
      axios.get(`${BASE_URL}/count-all-disaster`, {
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

export const fetchNews = () => async (dispatch) => {
  dispatch(fetchDisasterCountsStart());
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${BASE_URL}/get-by-author`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const newsData = response.data;

    if (newsData.status) {
      dispatch(fetchNewsSuccess(newsData.data));
    } else {
      dispatch(fetchNewsFail());
    }
  } catch (error) {
    dispatch(fetchNewsFail());
  }
};

export default dashboardDisasterSlice.reducer;
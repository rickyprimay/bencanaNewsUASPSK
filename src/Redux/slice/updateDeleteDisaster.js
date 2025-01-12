import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../utils/network"

const initialState = {
  creating: false,
  updating: false,
  deleting: false,
  error: null,
};

const updateDeleteDisasterSlice = createSlice({
  name: "updateDeleteDisaster",
  initialState,
  reducers: {
    createNewsStart: (state) => {
      state.creating = true;
      state.error = null;
    },
    createNewsSuccess: (state) => {
      state.creating = false;
    },
    createNewsFail: (state) => {
      state.creating = false;
      state.error = "Failed to create news";
      Swal.fire("Error", "Failed to create the news", "error");
    },
    updateNewsStart: (state) => {
      state.updating = true;
      state.error = null;
    },
    updateNewsSuccess: (state) => {
      state.updating = false;
    },
    updateNewsFail: (state) => {
      state.updating = false;
      state.error = "Failed to update news";
      Swal.fire("Error", "Failed to update the news", "error");
    },
    deleteNewsStart: (state) => {
      state.deleting = true;
      state.error = null;
    },
    deleteNewsSuccess: (state) => {
      state.deleting = false;
    },
    deleteNewsFail: (state) => {
      state.deleting = false;
      state.error = "Failed to delete news";
      Swal.fire("Error", "Failed to delete the news", "error");
    },
  },
});

export const {
  createNewsStart,
  createNewsSuccess,
  createNewsFail,
  updateNewsStart,
  updateNewsSuccess,
  updateNewsFail,
  deleteNewsStart,
  deleteNewsSuccess,
  deleteNewsFail,
} = updateDeleteDisasterSlice.actions;

export const createNews = (formData) => async (dispatch) => {
  dispatch(createNewsStart());
  try {
    const token = localStorage.getItem("token");

    await axios.post(`${BASE_URL}/disasters`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    dispatch(createNewsSuccess());
    Swal.fire("Created", "News created successfully", "success");
  } catch (error) {
    dispatch(createNewsFail());
  }
};

export const updateNews = (id, formData) => async (dispatch) => {
  dispatch(updateNewsStart());
  try {
    const token = localStorage.getItem("token");

    formData.append("_method", "PUT");

    try {
      await axios.post(`${BASE_URL}/disasters/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
    } catch (error) {
      console.error("API Error:", error.response ? error.response.data : error.message);
      dispatch(updateNewsFail());
    }
    

    dispatch(updateNewsSuccess());
    Swal.fire("Updated", "News updated successfully", "success");
  } catch (error) {
    dispatch(updateNewsFail());
  }
};

export const deleteNews = (id) => async (dispatch) => {
  dispatch(deleteNewsStart());
  try {
    const token = localStorage.getItem("token");
    await axios.delete(`${BASE_URL}/disasters/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
    });
    dispatch(deleteNewsSuccess());
    Swal.fire("Deleted", "News deleted successfully", "success");
  } catch (error) {
    dispatch(deleteNewsFails());
  }
}

export default updateDeleteDisasterSlice.reducer;

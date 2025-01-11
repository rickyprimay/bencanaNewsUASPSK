import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import Swal from 'sweetalert2';

const initialState = {
  disasters: [],
  loading: false,
  error: null,
};

const disasterSlice = createSlice({
  name: 'disasters',
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
      state.error = 'Failed to load disasters';
      Swal.fire('Error', 'Failed to load disaster data.', 'error');
    },
  },
});

export const { fetchDisastersStart, fetchDisastersSuccess, fetchDisastersFail } = disasterSlice.actions;

export const fetchDisasters = () => async (dispatch) => {
  dispatch(fetchDisastersStart());
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/disasters');
    dispatch(fetchDisastersSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchDisastersFail());
  }
};

export const fetchCountDisastersByAuthor = () => async (dispatch) => {
  dispatch(fetchDisastersStart());
  try {
    const response = await axios.get('http://127.0.0.1:8000/api//disasters/get-count-by-author');
    dispatch(fetchDisastersSuccess(response.data.data));
  } catch (error) {
    dispatch(fetchDisastersFail());
  }
};

export default disasterSlice.reducer;

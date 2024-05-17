import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  hotels: [],
  loading: false,
  error: "",
};

export const hotelsSlice = createSlice({
  name: "hotels",

  initialState,

  reducers: {
    fetchPending(state) {
      state.loading = true;
    },
    fetchSuccess(state, action) {
      state.loading = false;
      state.hotels = action.payload;
    },
    fetchReject(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { fetchPending, fetchSuccess, fetchReject } = hotelsSlice.actions;

export const fetchAsync = () => async (dispatch) => {
  try {
    dispatch(fetchPending());
    const { data } = await axios.get(`http://localhost:3000/hotels`, {
      headers: { Authorization: `Bearer ${localStorage.access_token}` },
    });
    dispatch(fetchSuccess(data.hotel));
  } catch (error) {
    dispatch(fetchReject(error.message));
    Swal.fire({
      icon: "error",
      title: error.message,
    });
  }
};

export default hotelsSlice.reducer;

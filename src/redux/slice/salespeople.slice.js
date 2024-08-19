
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  salespeople: [],
  error: null,
};

export const getSalespeople = createAsyncThunk("salespeople/get", async () => {
  const response = await axios.get("http://localhost:9000/api/v1/salespeople/get-salespeople");
  return response.data.data;
});

export const addSalespeople = createAsyncThunk(
  "salespeople/add",
  async (salespeople) => {
    const response = await axios.post(
      "http://localhost:9000/api/v1/salespeople/add-salespeople",
      salespeople, {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data.data;
  }
);

export const deleteSalespeople = createAsyncThunk(
  "salespeople/delete",
  async (snum) => {
    await axios.delete(`http://localhost:9000/api/v1/salespeople/delete-salesperson/${snum}`);
    return snum;
  }
);

export const updateSalespeople = createAsyncThunk(
  "salespeople/update",
  async (data) => {
    await axios.put(`http://localhost:9000/api/v1/salespeople/update-salesperson/${data.snum}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return data;
  }
);

const salespeopleSlice = createSlice({
  name: "salespeople",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSalespeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salespeople = action.payload;
      })
      .addCase(addSalespeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salespeople = state.salespeople.concat(action.payload);
      })
      .addCase(deleteSalespeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salespeople = state.salespeople.filter(
          (v) => v.snum !== action.payload
        );
      })
      .addCase(updateSalespeople.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salespeople = state.salespeople.map((v) =>
          v.snum === action.payload.snum ? action.payload : v
        );
      })
  },
});

export default salespeopleSlice.reducer;

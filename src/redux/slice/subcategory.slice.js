import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { baseURL } from '../../Utils/baseURL';

const initialState = {
  isLoading: false,
  subcategories: [],
  error: null,
};

export const getSubData = createAsyncThunk('subcategories/get', async () => {
  try {
    const response = await axios.get(baseURL +"subcategories/list-subcategories");
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});

export const handleAdd = createAsyncThunk('subcategories/add', async (data) => {
  try {
    const response = await axios.post(baseURL +"subcategories/create-subcategory", data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});

export const deleteSubcategory = createAsyncThunk('subcategories/delete', async (id) => {
  try {
    await axios.delete(baseURL +`subcategories/delete-subcategory/${id}`);
    return id;
  } catch (error) {
    console.error(error.message);
  }
});

export const handleUpdateData = createAsyncThunk('subcategories/update', async (data) => {
  try {
    const response = await axios.put(baseURL +`subcategories/update-subcategory/${data._id}`, data);
    return response.data;
  } catch (error) {
    console.error(error.message);
  }
});

const subcategorySlice = createSlice({
  name: 'subcategories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getSubData.fulfilled, (state, action) => {
        state.subcategories = action.payload.data;
      })
      .addCase(handleAdd.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.concat(action.payload.data);
      })
      .addCase(deleteSubcategory.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.filter((v) => v._id !== action.payload);
      })
      .addCase(handleUpdateData.fulfilled, (state, action) => {
        state.subcategories = state.subcategories.map((v) =>
          v._id === action.payload.data._id ? action.payload.data : v
        );
      });
  },
});

export default subcategorySlice.reducer;

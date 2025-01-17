// import axios from 'axios';
import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, GET_CATEGORY, LOADING_CATEGORY } from '../ActionType';
// import { baseURL } from '../../Utils/baseURL';
import axiosInstance from '../../Utils/axiosInstance';






export const setError = (error) => ({ type: ERROR_CATEGORY, payload: error });

export const getCategories = () => async (dispatch) => {
    dispatch({ type: LOADING_CATEGORY });
    try {
        const response = await axiosInstance.get("categories/list_categories");
        dispatch({ type: GET_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const addCategory = (data) => async (dispatch) => {
    dispatch({ type: LOADING_CATEGORY });
    try {
        const response = await axiosInstance.post("categories/post_categories", data);
        dispatch({ type: ADD_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    dispatch({ type: LOADING_CATEGORY });
    try {
        await axiosInstance.delete("categories/delete_categories/" + id);
        dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const editCategory = (data) => async (dispatch) => {
    dispatch({ type: LOADING_CATEGORY });
    try {
        const response = await axiosInstance.put("categories/update_categories/" + data._id, data);
        dispatch({ type: EDIT_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

// import axios from 'axios';
// import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, GET_CATEGORY } from '../ActionType';
// import { baseURL } from '../../Utils/baseURL';

// // Centralized error handler
// export const setError = (error) => ({
//     type: ERROR_CATEGORY,
//     payload: error?.response?.data?.message || error.message || "An unknown error occurred",
// });

// // Get categories
// export const getCategories = () => async (dispatch) => {
//     try {
//         const response = await axios.get(`${baseURL}categories/list_categories`);
//         dispatch({ type: GET_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error));
//     }
// };

// // Add category
// export const addCategory = (data) => async (dispatch) => {
//     try {
//         const response = await axios.post(`${baseURL}categories/post_categories`, data);
//         dispatch({ type: ADD_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error));
//     }
// };

// // Delete category
// export const deleteCategory = (id) => async (dispatch) => {
//     try {
//         await axios.delete(`${baseURL}categories/delete_categories/${id}`);
//         dispatch({ type: DELETE_CATEGORY, payload: id });
//     } catch (error) {
//         dispatch(setError(error));
//     }
// };

// // Edit category
// export const editCategory = (data) => async (dispatch) => {
//     try {
//         const response = await axios.put(`${baseURL}categories/update_categories/${data._id}`, data);
//         dispatch({ type: EDIT_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error));
//     }
// };


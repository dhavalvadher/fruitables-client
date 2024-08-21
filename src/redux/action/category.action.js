// import axios from 'axios';
// import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, GET_CATEGORY } from '../ActionType';





// export const setError = (error) => ({ type: ERROR_CATEGORY, payload: error });

// export const getCategories = () => async (dispatch) => {
//     try {
//         const response = await axios.get("https://fruitables-server-sooty.vercel.app/api/v1/categories/list_categories");
//         dispatch({ type: GET_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// };

// export const addCategory = (data) => async (dispatch) => {
    
//     try {
//         const response = await axios.post("https://fruitables-server-sooty.vercel.app/api/v1/categories/post_categories", data);
//         dispatch({ type: ADD_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// };

// export const deleteCategory = (id) => async (dispatch) => {
    
//     try {
//         await axios.delete("https://fruitables-server-sooty.vercel.app/api/v1/categories/delete_categories/" + id);
//         dispatch({ type: DELETE_CATEGORY, payload: id });
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// };

// export const editCategory = (data) => async (dispatch) => {
    
//     try {
//         const response = await axios.put("https://fruitables-server-sooty.vercel.app/api/v1/categories/update_categories/" + data._id, data);
//         dispatch({ type: EDIT_CATEGORY, payload: response.data });
//     } catch (error) {
//         dispatch(setError(error.message));
//     }
// };

import axios from 'axios';
import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, GET_CATEGORY } from '../ActionType';

export const setError = (error) => ({ type: ERROR_CATEGORY, payload: error });

const axiosInstance = axios.create({
    baseURL: 'https://fruitables-server-sooty.vercel.app/api/v1/categories',
});

// Adding token to the header of each request
axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('token'); // Get token from localStorage
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Set the Authorization header
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const getCategories = () => async (dispatch) => {
    try {
        const response = await axiosInstance.get("/list_categories");
        dispatch({ type: GET_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const addCategory = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.post("/post_categories", data);
        dispatch({ type: ADD_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const deleteCategory = (id) => async (dispatch) => {
    try {
        await axiosInstance.delete(`/delete_categories/${id}`);
        dispatch({ type: DELETE_CATEGORY, payload: id });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

export const editCategory = (data) => async (dispatch) => {
    try {
        const response = await axiosInstance.put(`/update_categories/${data._id}`, data);
        dispatch({ type: EDIT_CATEGORY, payload: response.data });
    } catch (error) {
        dispatch(setError(error.message));
    }
};

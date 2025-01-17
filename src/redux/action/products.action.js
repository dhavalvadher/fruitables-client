// import axios from 'axios';
import { GET_PRODUCTS, ADD_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, LOADING_PRODUCTS, ERROR_PRODUCTS } from '../ActionType';
// import { baseURL } from '../../Utils/baseURL';
import axiosInstance from '../../Utils/axiosInstance';


export const getProducts = () => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
        const response = await axiosInstance.get("products/list-products");
        dispatch({ type: GET_PRODUCTS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        console.error("Failed to fetch products:", error);
    }
};

export const addProducts = (product) => async (dispatch) => {
    console.log(product);
    dispatch({ type: LOADING_PRODUCTS });
    try {
        const response = await axiosInstance.post("products/create-product", product, {
            headers: { 'Content-Type': 'multipart/form-data'},
        });

        console.log(response);

        dispatch({ type: ADD_PRODUCTS, payload: response.data.data });

    } catch (error) {
        dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        console.error("Failed to add product:", error);
    }
};

export const editProducts = (product) => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
        const response = await axiosInstance.put(`products/update-product/${product._id}`, product,{
            headers: { 'Content-Type': 'multipart/form-data'},
        });

        dispatch({ type: EDIT_PRODUCTS, payload: response.data.data });
    } catch (error) {
        dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        console.error("Failed to edit product:", error);
    }
};

export const deleteProducts = (id) => async (dispatch) => {
    dispatch({ type: LOADING_PRODUCTS });
    try {
        await axiosInstance.delete(`products/delete-product/${id}`);
        dispatch({ type: DELETE_PRODUCTS, payload: id });
    } catch (error) {
        dispatch({ type: ERROR_PRODUCTS, payload: error.message });
        console.error("Failed to delete product:", error);
    }
};

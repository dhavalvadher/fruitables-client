import axios from "axios";
import { ADD_VARIANTS, DELETE_VARIANTS, EDIT_VARIANTS, GET_VARIANTS } from "../ActionType";
import { baseURL } from "../../Utils/baseURL";

export const getVariant = () => async (dispatch) => {
    try {
        const response = await axios.get(baseURL +"variants/list-variant");
        dispatch({ type: GET_VARIANTS, payload: response.data.data });
    } catch (error) {
        console.error("Error fetching variants:", error);
    }
};

export const addVariant = (data) => async (dispatch) => {
    try {
        const response = await axios.post(baseURL +"variants/add-variant", data, {
            headers: { 'Content-Type': 'multipart/form-data'},
        });
        dispatch({ type: ADD_VARIANTS, payload: response.data.data });
    } catch (error) {
        console.error("Error adding variant:", error);
    }
};

export const deleteVariant = (_id) => async (dispatch) => {
    try {
        await axios.delete(baseURL +`variants/delete-variant/${_id}`);
        dispatch({ type: DELETE_VARIANTS, payload: _id });
    } catch (error) {
        console.error("Error deleting variant:", error);
    }
};

export const editVariant = (data) => async (dispatch) => {
    try {
        const response = await axios.put(baseURL +`variants/update-variant/${data._id}`, data, {
            headers: { 'Content-Type': 'multipart/form-data'},
        });
        dispatch({ type: EDIT_VARIANTS, payload: response.data.data });
    } catch (error) {
        console.error("Error editing variant:", error);
    }
};

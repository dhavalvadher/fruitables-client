// import { ADD_Facility, DELETE_FACILITY, EDIT_FACILITY, GET_FACILITY, LOADING_FACILITY } from "../ActionType"

import { LOADING_FACILITY,ADD_Facility, DELETE_FACILITY, EDIT_FACILITY, GET_FACILITY } from "../ActionType";




const handleLoading = (data) => (dispatch) => {
    dispatch({ type: LOADING_FACILITY, payload: data })
}

export const Facility_data = (data) => (dispatch) => {
    dispatch(handleLoading())
    setTimeout(() => {
        dispatch({ type: ADD_Facility, payload: data })
    },2000);

}

export const Get_Facility = () => (dispatch) => {
    dispatch({ type: GET_FACILITY})
}

export const Delete_data = (data) => (dispatch) => {
    dispatch({ type: DELETE_FACILITY, payload: data })
}


export const Edit_data = (data) => (dispatch) => {
    dispatch({ type: EDIT_FACILITY, payload: data })
}

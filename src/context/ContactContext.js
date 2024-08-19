import { createContext, useReducer } from "react";
import { contactreducer } from "./reducer/contact.reducer";
import axios from "axios";
import { baseURL } from "../Utils/baseURL";
import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, GET_CONTACT } from "./ActionType";



const initialState = {
    isLoading: false,
    contact: [],
    error: null
}

export const ContactContext = createContext();

export const ContactProvider = ({ children }) => {
    const [state, dispatch] = useReducer(contactreducer, initialState);

    const addContact = async (data) => {
        try {
            const response = await axios.post(baseURL + "contact", data)
            dispatch({ type: ADD_CONTACT, payload: response.data })
        } catch (error) {
            console.log(error);
        }
    }


    const getContact = async () => {
        try {
            const res = await axios.get(baseURL + 'contact')
            dispatch({ type: GET_CONTACT, payload: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteContact = async (id) => {
        try {
            const res = await axios.delete(baseURL + `contact/${id}`)
            dispatch({ type: DELETE_CONTACT, payload: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    const editContact = async (data) => {
        try {
            const res = await axios.put(baseURL + `contact/${data.id}`, data)
            dispatch({ type: EDIT_CONTACT, payload: res.data })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ContactContext.Provider
            value={{
                ...state,
                addContact,
                getContact,
                deleteContact,
                editContact
            }}
        >

            {children}
        </ContactContext.Provider>
    )

}









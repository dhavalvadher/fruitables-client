import { ADD_CONTACT, DELETE_CONTACT, EDIT_CONTACT, GET_CONTACT } from "../ActionType"


export const contactreducer = (state, action) => {
    switch (action.type) {
        case ADD_CONTACT:
            return {
                ...state,
                isLoading: false,
                contact: state.contact.concat(action.payload),
                error: null
            }

        case GET_CONTACT:
            return {
                ...state,
                contact: action.payload
            }
        case DELETE_CONTACT:
            return {
                ...state,
                contact: state.contact.filter((item) => item.id !== action.payload),
            }
        case EDIT_CONTACT:
            return {
                ...state,
                contact: state.contact.map((v) => {
                    if (v.id === action.payload.id) {
                        return action.payload
                    } else {
                        return v
                    }
                })
            }
        default:
            return state
    }
}







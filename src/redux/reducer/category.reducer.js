import { ADD_CATEGORY, DELETE_CATEGORY, EDIT_CATEGORY, ERROR_CATEGORY, GET_CATEGORY, LOADING_CATEGORY } from "../ActionType";

const initialState = {
    isLoading: false,
    categories: [],
    error: null
};

export const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOADING_CATEGORY:
            return {
                ...state,
                isLoading: true
            };

        case ERROR_CATEGORY:
            return {
                ...state,
                isLoading: false,
                error: action.payload
            };

        case GET_CATEGORY:
            return {
                isLoading: false,
                categories: action.payload.data,
                error: null
            };

        case ADD_CATEGORY:
            return {
                isLoading: false,
                categories: [...state.categories, action.payload.data],
                error: null
            };

        case DELETE_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.filter((v) => v._id !== action.payload),
                error: null
            };

        case EDIT_CATEGORY:
            return {
                isLoading: false,
                categories: state.categories.map((v) => {
                    if (v._id === action.payload._id) {
                        return action.payload
                    } else {
                        return v
                    }
                }),
                error: null
            }

        default:
            return state;
    }
};

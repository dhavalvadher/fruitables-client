import { DELETE_REVIEWS, EDIT_REVIEWS, GET_REVIEWS } from "../ActionType";

const initialState = {
    isLoading: false,
    review: [],
    error: null
}

export const reviewReducer = (state = initialState, action) => {
    console.log(action);

    switch (action.type) {

        case GET_REVIEWS:
            return {
                ...state,
                isLoading: false,
                review: state.review.concat(action.payload),
                error: null
            }

        case DELETE_REVIEWS:
            return {
                ...state,
                isLoading: false,
                review: state.review.filter((v) => v.id !== action.payload),
                error: null
            }

        case EDIT_REVIEWS:
            return {
                ...state,
                isLoading: false,
                review: state.review.map((review) =>
                    review.id !== action.payload.id ? review : action.payload
                ),
                error: null
            };

        default:
            return state;
    }
}


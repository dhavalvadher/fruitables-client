import { GET_SHOP } from "../ActionType";


const inistialState = {
    isLoading: false,
    fruits: [],
    error: null
}

export const shopReducer = (state = inistialState, action) => {
    console.log(action);

    switch (action.type) {

        case GET_SHOP:

            return {
                isLoading: false,
                fruits: action.payload,
                error: null
            }


        default:
            return state
    }
}


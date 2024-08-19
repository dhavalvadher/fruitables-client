import { ADD_Facility, DELETE_FACILITY, EDIT_FACILITY, GET_FACILITY, LOADING_FACILITY } from "../ActionType";


const inistialState = {
    isLoading : false,
    facility : [],
    error : null
}

export const FacilitesReducer = (state=inistialState,action) => {
    console.log(action);

    switch (action.type) {

        case LOADING_FACILITY:

        return {
            ...state,   
            
            isLoading: true 
        }
        case GET_FACILITY:

        return {
            ...state,        
        }
        case ADD_Facility:

        return {
            ...state,
            isLoading:false ,
            facility : state.facility.concat(action.payload)
        }

        case DELETE_FACILITY:

        return {
            ...state,
            isLoading:false ,
            facility: state.facility.filter((v)=> v.id !== action.payload)
        }
            
        case EDIT_FACILITY:

        return {
            ...state,
            isLoading:false ,
            facility: state.facility.map((v) => {
                if(v.id === action.payload.id) {
                    return action.payload 
                } else {
                    return v;
                }
            })

        }  
    
        default:
           return state
    }
}
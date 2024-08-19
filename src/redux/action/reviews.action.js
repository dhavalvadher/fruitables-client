
import axios from 'axios';
import { LOADING_REVIEWS, DELETE_REVIEWS , EDIT_REVIEWS, ERROR_REVIEWS, GET_REVIEWS } from '../ActionType';
import { baseURL } from '../../Utils/baseURL';

// import { DELETE_REVIEWS , EDIT_REVIEWS, ERROR_REVIEWS, GET_REVIEWS, LOADING_REVIEWS } from '../ActionType';
// import { baseURL } from '../../Utils/baseURL';







export const loadingReview = () => async (dispatch) => {
    dispatch({ type: LOADING_REVIEWS})
}

export const errorReview = (error) => async (dispatch) => {
    dispatch({ type: ERROR_REVIEWS, payload: error })
}




export const getReview = () => async (dispatch) => {
    try {
        dispatch(loadingReview())
        await axios.get(baseURL + 'reviews')
            .then((response) => {
                dispatch({ type: GET_REVIEWS, payload: response.data })
            })
            .catch((error) => {
                dispatch(errorReview(error.message))
            })

    } catch (error) {
        dispatch(errorReview(error.message))
    }

}




export const removeReview = (id) => async (dispatch) => {
    try {
        dispatch(loadingReview());
        await axios.delete(baseURL + 'reviews/' + id)
            .then(dispatch({ type: DELETE_REVIEWS, payload: id }))
            .catch((error) => dispatch(errorReview(error.message)))

    } catch (error) {
        dispatch(errorReview(error.message))
    }
}

export const editReview = (data) => async (dispatch) => {
    console.log(data);
    try {
        dispatch(loadingReview());
        await axios.put(baseURL + 'reviews/' + data.id, data)
            .then(dispatch({ type: EDIT_REVIEWS, payload: data }))
            .catch((error) => dispatch(errorReview(error.message)))

    } catch (error) {
        dispatch(errorReview(error.message))
    }
}


//----------------//


export const addReview = (data) => async (dispatch) => {
  try {

    await axios.post(baseURL + 'reviews',data)
      .then((response) => {
        setTimeout(() => {
          dispatch({ type: GET_REVIEWS, payload: response.data })

        }, 2000)
        console.log(response.data);
      })
      .catch((error) => {
      })
  } catch (error) {
    console.log(error);

  }
}
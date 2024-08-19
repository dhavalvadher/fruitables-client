import axios from 'axios';
import { GET_SHOP } from '../ActionType';
import { baseURL } from '../../Utils/baseURL';






export const getshop = () => async (dispatch) => {
    try {
        await axios.get(baseURL + "fruits")
            .then((response) => {

                dispatch({ type: GET_SHOP, payload: response.data })

            })
            .catch((error) => {

                console.log(error);
            })
    } catch (error) {
        console.log(error);
    }


}


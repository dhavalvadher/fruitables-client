// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import axios from "axios";

// const initialState = {
//     coupon: [],
//     isLoading: false,
//     error: null
// };

// export const addcoupon = createAsyncThunk(
//     'coupon/addaddcoupon',
//     async(data)=> {
//         console.log(data);
//     }
// )



// const couponSlice = createSlice({
//     name: "coupon",
//     initialState: initialState,
//     reducers: {},
//     extraReducers: () => {

//     }

// })

// export default couponSlice.reducer;

// export const couponSlice = createSlice({
//     name: "coupon",
//     initialState: initialState,
//     reducers: {
//         getCouponStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         getCouponSuccess: (state, action) => {
//             state.coupon = action.payload;
//             state.isLoading = false;
//         },
//         getCouponFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         },
//         addCouponStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         addCouponSuccess: (state, action) => {
//             state.coupon = action.payload;
//             state.isLoading = false;
//         },
//         addCouponFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         },
//         removeCouponStart: (state) => {
//             state.isLoading = true;
//             state.error = null;
//         },
//         removeCouponSuccess: (state, action) => {
//             state.coupon = state.coupon.filter((item) => item.id !== action.payload);
//             state.isLoading = false;
//         },
//         removeCouponFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         },
//         updateCouponStart: (state) => {
//             state.isLoading = true;
//         },
//         updateCouponSuccess: (state, action) => {
//             state.coupon = state.coupon.map((item) => {
//                 if (item.id === action.payload.id) {
//                     return action.payload;
//                 } else {
//                     return item;
//                 }
//             });
//             state.isLoading = false;
//         },
//         updateCouponFailure: (state, action) => {
//             state.isLoading = false;
//             state.error = action.payload;
//         }
//     },

// });

// export const { getCouponStart, getCouponSuccess, getCouponFailure, addCouponStart, addCouponSuccess, addCouponFailure, removeCouponStart, removeCouponSuccess, removeCouponFailure, updateCouponStart, updateCouponSuccess, updateCouponFailure } = couponSlice.actions;

// export const getCoupon = () => async (dispatch) => {
//     dispatch(getCouponStart());
//     try {
//         const response = await axios.get("http://localhost:4000/coupon");
//         dispatch(getCouponSuccess(response.data));
//     } catch (error) {
//         dispatch(getCouponFailure(error.message));
//     }
// };

// export const addCoupon = (couponData) => async (dispatch) => {
//     dispatch(addCouponStart());
//     try {
//         const response = await axios.post("http://localhost:4000/coupon", couponData);
//         dispatch(addCouponSuccess(response.data));
//     } catch (error) {
//         dispatch(addCouponFailure(error.message));
//     }
// };

// export const removeCoupon = (id) => async (dispatch) => {
//     dispatch(removeCouponStart());
//     try {
//         await axios.delete(`http://localhost:4000/coupon/${id}`);
//         dispatch(removeCouponSuccess(id));
//     } catch (error) {
//         dispatch(removeCouponFailure(error.message));
//     }
// }

// export const updateCoupon = (id, couponData) => async (dispatch) => {
//     dispatch(updateCouponStart());
//     try {
//         const response = await axios.put(`http://localhost:4000/coupon/${id}`, couponData);
//         dispatch(updateCouponSuccess(response.data));
//     } catch (error) {
//         dispatch(updateCouponFailure(error.message));
//     }
// };

// export default couponSlice.reducer;






import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../../Utils/baseURL";


const initialState = {
    isLoading: false,
    coupon: [],
    error: null,
};




export const getCoupon = createAsyncThunk(
    'coupon/get',
    async () => {
        try {
            const response = await axios.get(baseURL + 'coupon')
            return response.data
        } catch (error) {
            return error.massage
        }
    }
)

export const deleteCoupon = createAsyncThunk(
    'coupon/delete',
    async (id) => {
        try {
            await axios.delete(baseURL + `coupon/${id}`)
            return id
        } catch (error) {
            return error.massage
        }
    }
)

export const editCoupon = createAsyncThunk(
    'coupon/edit',
    async (data) => {
        console.log(data);
        try {
            const response = await axios.put(baseURL + 'coupon/' + data.id, data)
            console.log(response.data);
            return response.data
        } catch (error) {
            return error.message
        }

    }
)

export const addCoupon = createAsyncThunk(
    "coupon/addCoupon",
    async (data) => {
        try {
            const response = await axios.post(baseURL + "coupon", data);
            return response.data;
        } catch (error) {
            throw error;
        }
    }
);

const couponSlice = createSlice({
    name: "coupon",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(addCoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = state.coupon.concat(action.payload)
        })
        builder.addCase(getCoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = action.payload
        })
        builder.addCase(deleteCoupon.fulfilled, (state, action) => {
            console.log(action);
            state.coupon = state.coupon.filter((v) => v.id !== action.payload);
        })
        builder.addCase(editCoupon.fulfilled, (state, action) => {
            state.coupon = state.coupon.map((v) => {
                if (v.id === action.payload.id) {
                    return action.payload
                } else {
                    return v
                }
            })
        })

    },
});

export default couponSlice.reducer;
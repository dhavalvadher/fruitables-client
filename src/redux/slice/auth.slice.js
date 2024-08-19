import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import Cookies from 'js-cookie';
import axiosInstance from "../../Utils/axiosInstance";
import { setAlert } from "./alert.slice";


const initialState = {
    isAuthentication: false,
    isLogedout: true,
    isLoading: false,
    users: null,
    error: null
}

export const register = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {
        try {
            console.log(data);

            const response = await axiosInstance.post("users/useradd", data);
            console.log(response);

            if (response.status === 201) {
                return response.data
            }
        } catch (error) {
            return rejectWithValue("registration error user already exist", error.response.data.message);
        }


    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (data, {dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('users/login', data);

            console.log(response);

            if (response.status === 200) {
                dispatch(setAlert({color:"success", message:response.data.message}))
                return response.data
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Registration error: " + error.response.data.message)
        }

    }
)

// export const logout = createAsyncThunk(
//     'auth/logout',
//     async (_id, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.post('users/logout', { _id });
//             console.log(response);

//             if (response.status === 200) {
//                 return response.data
//             }
//         } catch (error) {
//             console.log(error);
//             return rejectWithValue("user logout: " + error.response.data.message)
//         }

//     }
// )

// export const checkAuth = createAsyncThunk(
//     'auth/checkAuth',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.get('users/checkAuth');
//             console.log("checkayth log",response);
//             if (response.data.success) {
//                 localStorage.setItem("_id", response.data.data._id)
//                 return response.data;
//             }
//         } catch (error) {
//             console.log(error);
//             return rejectWithValue("checkAuth error: " + error.response.data.message)
//         }
//     }

// )

export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, {dispatch, rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('users/logout', { _id });
            if (response.status === 200) {
                Cookies.remove('accessToken');
                dispatch(setAlert({color:"error", message:response.data.message}))
                return response.data;
            }
        } catch (error) {
            dispatch(setAlert({color:"error", message:error.data.message}))
            return rejectWithValue("User logout error: " + error.response?.data?.message || error.message);
        }
    }
);



// export const checkAuth = createAsyncThunk(
//     'auth/checkAuth',
//     async (_, { rejectWithValue }) => {
//         try {
//             const response = await axiosInstance.get('users/checkAuth');
//             if (response.data.success) {
//                 return response.data;
//             } else {
//                 return rejectWithValue(response.data.message || 'CheckAuth failed');
//             }
//         } catch (error) {
//             return rejectWithValue(error.response?.data?.message || "Check auth error");
//         }
//     }
// );

export const checkAuth = createAsyncThunk(
    'auth/checkAuth',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('users/checkAuth');
            if (response.data.success) {
                return response.data;
            }
            return rejectWithValue(response.data.message || 'CheckAuth failed');
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || 'Check auth error');
        }
    }
);


export const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    extraReducers: (bulider) => {
        bulider.addCase(register.fulfilled, (state, ation) => {
            state.isAuthentication = false
            state.isLogedout = true
            state.isLoading = false
            state.error = null
            state.users = ation.payload

        })
        bulider.addCase(register.rejected, (state, ation) => {
            state.isAuthentication = false
            state.isLogedout = true
            state.isLoading = false
            state.error = null
            state.users = ation.payload
        })


        bulider.addCase(login.fulfilled, (state, action) => {
            state.isAuthentication = true;
            state.isLogedout = false;
            state.isLoading = false;
            state.users = action.payload.data;
            state.error = null;
        });

        bulider.addCase(login.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLogedout = true;
            state.isLoading = false;
            state.users = null;
            state.error = action.payload;
        });

        bulider.addCase(logout.fulfilled, (state, action) => {
            state.isAuthentication = false;
            state.isLogedout = true;
            state.isLoading = false;
            state.users = null;
            state.error = null;
        });

        bulider.addCase(logout.rejected, (state, action) => {
            state.isAuthentication = true;
            state.isLogedout = false;
            state.isLoading = false;
            state.error = action.payload;
        });

        // bulider.addCase(checkAuth.fulfilled, (state, action) => {
        //     state.isAuthentication = true;
        //     state.isLogedout = false;
        //     state.isLoading = false;
        //     state.users = action.payload.data;
        //     state.error = null;
        // });

        // bulider.addCase(checkAuth.rejected, (state, action) => {
        //     state.isAuthentication = false;
        //     state.isLogedout = true;
        //     state.isLoading = false;
        //     state.users = null;
        //     state.error = action.payload;
        // });

        bulider.addCase(checkAuth.fulfilled, (state, action) => {
            state.isAuthentication = true;
            state.isLogedout = false;
            state.isLoading = false;
            state.users = action.payload.data;
            state.error = null;
        });

        bulider.addCase(checkAuth.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLogedout = true;
            state.isLoading = false;
            state.users = null;
            state.error = action.payload;
        });

    }
})

export default authSlice.reducer;




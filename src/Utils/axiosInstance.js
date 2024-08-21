// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { baseURL } from './baseURL';
// import { logout } from '../redux/slice/auth.slice';

// const axiosInstance = axios.create({
//     baseURL: baseURL,
//     withCredentials: true,
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('accessToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;

//             try {
//                 const response = await axios.post(baseURL + 'users/get-newtoken', {}, { withCredentials: true });

//                 console.log("axiosInstance get-newtoken", response);
                
//                 if (response.status === 200) {
//                     const { accessToken } = response.data;

//                     Cookies.set('accessToken', accessToken);

//                     originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//                     return axiosInstance(originalRequest);
//                 }
//             } catch (refreshError) {
//                 const { store } = require('../redux/store').configureStore();
//                 const _id = localStorage.getItem("_id");
//                 store.dispatch(logout(_id));

//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;

// import axios from 'axios';
// import Cookies from 'js-cookie';
// import { baseURL } from './baseURL';
// import { logout } from '../redux/slice/auth.slice';

// const axiosInstance = axios.create({
//     baseURL: baseURL,
//     withCredentials: true,
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const token = Cookies.get('accessToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//         const originalRequest = error.config;

//         if (error.response?.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             try {
//                 const response = await axios.post(baseURL + 'users/get-newtoken', {}, { withCredentials: true })
//                 console.log("responesswnjwdn",response);
                
//                 if (response.status === 200) {
//                     const { accessToken } = response.data;
//                     Cookies.set('accessToken', accessToken, { expires: 1 });
//                     originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
//                     return axiosInstance(originalRequest);
//                 }
//             } catch (refreshError) {
//                 const { store } = require('../redux/store').configureStore();
//                 const _id = localStorage.getItem("_id");
//                 store.dispatch(logout(_id));
//                 return Promise.reject(refreshError);
//             }
//         }

//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;


import axios from 'axios';
import Cookies from 'js-cookie';

import { logout } from '../redux/slice/auth.slice';
import { baseURL } from './baseURL';


const axiosInstance = axios.create({
    baseURL: baseURL,
    withCredentials: true, 
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            try {          
                const response = await axios.post(baseURL + 'users/get-newtoken', {}, { withCredentials: true })
            
                console.log("axiosInstance get-newtoken", response);
                
                if (response.status === 401) {
                    const { accessToken } = response.data;
                    originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
                    return axiosInstance(originalRequest);
                }
            } catch (refreshError) {
                const { store } = require('../redux/store').configureStore();
                const _id = localStorage.getItem("_id");
                store.dispatch(logout(_id));
                return Promise.reject(refreshError);
            }
        }
        
        return Promise.reject(error);
    }
);


export default axiosInstance;







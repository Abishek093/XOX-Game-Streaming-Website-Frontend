// import axios from "axios";
// import Cookies from "js-cookie";
// import { refreshAccessToken } from "./api";

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:500http://localhost:5000/api/'
// })


// axiosInstance.interceptors.request.use(
//     (config)=>{
//         const accessToken = Cookies.get('accessToken');
//         if(accessToken){
//             config.headers.Authorization =`Bearer${accessToken}`
//         }
//         return config
//     },(error)=>{
//         console.log(error);
//         return Promise.reject(error);
//     }
// )


// axios.interceptors.response.use(
//     (response)=>{
//         return response
//     },
//     async(error)=>{
//         const originalRequest = error.config;
//         if(error.response && error.response.status === 401 && !originalRequest._retry){
//             originalRequest._retry = true;
//             const refreshToken = Cookies.get('refreshToken');
//             if(refreshToken){
//                 try {
//                     const {accessToken} = await refreshAccessToken(refreshToken)
//                     Cookies.set('accessToken', accessToken,{expires:1/96});
//                     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//                     originalRequest.headers.Authorization = `Bearer ${accessToken}`
//                     return axiosInstance(originalRequest)
//                 } catch (refreshError) {
//                     Cookies.remove('accessToken');
//                     Cookies.remove('refreshToken')
//                     window.location.href = '/login'; 
//                     return Promise.reject(refreshError);
//                 }
//             }else{
//                 Cookies.remove('accessToken');
//                 Cookies.remove('refreshToken')
//                 window.location.href = '/login'; 
//             }
//         }
//         return Promise.reject(error);
//     }
// )

// export default axiosInstance;
// import axios from "axios";
// import Cookies from "js-cookie";
// import { refreshAccessToken } from "./api";

// const axiosInstance = axios.create({
//     baseURL: 'http://localhost:5000/api/' 
// });

// axiosInstance.interceptors.request.use(
//     (config) => {
//         const accessToken = Cookies.get('UserAccessToken');
//         if (accessToken) {
//             config.headers.Authorization = `Bearer ${accessToken}`;
//         }
//         return config;
//     },
//     (error) => {
//         console.log(error);
//         return Promise.reject(error);
//     }
// );

// axiosInstance.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     async (error) => {
//         const originalRequest = error.config;
//         if (error.response && error.response.status === 401 && !originalRequest._retry) {
//             originalRequest._retry = true;
//             const refreshToken = Cookies.get('UserRefreshToken');
//             if (refreshToken) {
//                 try {
//                     const { accessToken } = await refreshAccessToken(refreshToken);
//                     Cookies.set('UserAccessToken', accessToken, { expires: 1 / 96 });
//                     axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
//                     originalRequest.headers.Authorization = `Bearer ${accessToken}`;
//                     return axiosInstance(originalRequest);
//                 } catch (refreshError) {
//                     Cookies.remove('UserAccessToken');
//                     Cookies.remove('UserRefreshToken');
//                     window.location.href = '/login';
//                     return Promise.reject(refreshError);
//                 }
//             } else {
//                 Cookies.remove('UserAccessToken');
//                 Cookies.remove('UserRefreshToken');
//                 window.location.href = '/login';
//             }
//         }
//         return Promise.reject(error);
//     }
// );

// export default axiosInstance;



import axios from 'axios';
import Cookies from 'js-cookie';
import { refreshAccessToken } from './api';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api/',
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = Cookies.get('UserAccessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = Cookies.get('UserRefreshToken');
      if (refreshToken) {
        try {
          const { accessToken, refreshToken: newRefreshToken } = await refreshAccessToken(refreshToken);
          Cookies.set('UserAccessToken', accessToken, { expires: 1 / 96 }); // 15 minutes
          Cookies.set('UserRefreshToken', newRefreshToken, { expires: 7 }); // 7 days
          axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          Cookies.remove('UserAccessToken');
          Cookies.remove('UserRefreshToken');
          const navigate = useNavigate();
          navigate('/login');
          return Promise.reject(refreshError);
        }
      } else {
        Cookies.remove('UserAccessToken');
        Cookies.remove('UserRefreshToken');
        const navigate = useNavigate();
        navigate('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

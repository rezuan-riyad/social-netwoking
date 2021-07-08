import axios from "axios";
import { cert } from '../../config/paths'
import path from 'path'


// https agent to trust self signed ssl certificate


const axiosInstance = axios.create({
    baseURL: "https://localhost:5000/api",
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
})

// Adding request interceptor
axiosInstance.interceptors.request.use((config) => {
    // before req sent
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

axiosInstance.interceptors.response.use(function (response) {
    return response
}, function (error) {
    const originalReq = error.config
    // let refreshToken = JSON.parse(localStorage.getItem('refreshToken'))

    if (error.response.data.message === 'jwt expired') {
        return axiosInstance.post('/auth/token')
            .then(res => res.data)
            .then(data => {
                localStorage.setItem('accessToken', JSON.stringify(data.accessToken))
                // console.log('access token refershed')
                originalReq.headers['Authorization']= `Bearer ${data.accessToken}`
                return axios(originalReq)
            })
            .catch(err => {
                //
            })
    } else {
        return Promise.reject(error)
    }
})

export default axiosInstance
import axios from 'axios'
import jwt_decode from "jwt-decode";
import dayjs from 'dayjs'


const baseURL = 'http://127.0.0.1:8000/account'


let authTokens = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
const axiosInstance = axios.create({
    baseURL,
    headers:{Authorization: `Bearer ${authTokens?.access}`}
});

axiosInstance.interceptors.request.use(async req => {
    if(!authTokens){
        authTokens = localStorage.getItem('authToken') ? JSON.parse(localStorage.getItem('authToken')) : null
        req.headers.Authorization = `Bearer ${authTokens?.access}`
    }
    const user = jwt_decode(authTokens.access)
    const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

    if(!isExpired) return req

    console.log(authTokens.refresh)
    const response = await axios.post(`${baseURL}/api/token/refresh/`, {
        refresh: authTokens.refresh
      });

    // localStorage.setItem('authToken', JSON.stringify(response.data))
    req.headers.Authorization = `Bearer ${response.data.access}`
    return req
})


export default axiosInstance;
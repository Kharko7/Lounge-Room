
import { createBrowserHistory } from "history";
import { authService } from "../auth.service/auth.services";
import axios from "axios";
import { baseURL } from "../../constants/urls/urls";
import { getFromLocalStorage } from "services/local-storage.service";
const axiosService = axios.create({ baseURL });

axiosService.interceptors.request.use((config: any) => {
    const token = getFromLocalStorage('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
});


// axiosService.interceptors.request.use((config:any)=>{
//     const access = authService.getAccessToken();
//     if(access){
//         config.headers.Authorization = `Bearer ${access}`
//     }
//     return config
// });



let isAuth = false;

const history = createBrowserHistory();


// axiosService.interceptors.response.use((config)=>{return config},
//     async (error)=>{
//         const refresh = authService.getRefreshToken();
//         if(!isAuth&&error.response?.status === 401 && error.config&&refresh){
//             isAuth = true;
//             try {
//                 const {data} = await authService.refresh(refresh);
//                 authService.setTokens(data)
//             }catch (e){
//                 authService.deleteTokens();
//                 return history.replace('/login?ExpSession=true')
//             }
//             isAuth = false;
//             return axiosService(error.config)
//         }
//         return Promise.reject(error)
//     })


export {
    axiosService
}
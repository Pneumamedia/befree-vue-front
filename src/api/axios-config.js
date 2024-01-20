import axios from 'axios'
import vm from "../main";
import noInternet from 'no-internet';
import { notification } from '@/util/notification';

const http_client = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    header: {
        accept: 'application/json',
    },
    withCredentials: false,
});

var isOffLine = false;
var path = window.location.pathname.includes('admin')

let api = function() {

    noInternet().then(offline=>{
        if(offline){
            isOffLine = true;
            notification.warning("Please check your internet connectivity")
        }
    })

    if(isOffLine){
        //return;
    }

    let token = path ? localStorage.getItem("admin-befree-token") : localStorage.getItem("befree-token");
    if (token) {
        http_client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return http_client;
};

api().interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401 || error.response.status === 403) {
            if(path){
                vm.$store.dispatch("authStore/adminLogOut");
            }else{
                vm.$store.dispatch("authStore/logOut");
            }
        }
        return Promise.reject(error);
    }
);

export const http = api;

export const apiVersion = '/v1'
 
import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    users(page=null){
        return http().get(`${endPoints.users}?page=${page}`)
    },

    updateUser(data){
        return http().put(`${endPoints.users}/update`,data)
    },

    createProfile(data){
        return http().post(`${endPoints.users}/create-profile`,data)
    },

    updateProfile(data){
        return http().post(`${endPoints.users}/update-profile`,data)
    },

    profileDetails(){
        return http().get(`${endPoints.users}/profile-details`)
    },

    states(country){
        return http().get(`${endPoints.users}/states?country_code=${country}`)
    },

    //-----------------------admin---------------------------------//

    //admin get uer profile details
    userProfileDetails(owner_uuid){
        return http().get(`${endPoints.users}/${owner_uuid}/profile-details`)
    },

    //admin get total users
    totalUsers(){
        return http().get(`${endPoints.users}/total-users`)
    },

    activeUsers(page=null){
        return http().get(`${endPoints.users}/active-users?page=${page}`)
    },

    totalActiveUsers(){
        return http().get(`${endPoints.users}/total-active-users`)
    },

    inactiveUsers(page=null){
        return http().get(`${endPoints.users}/inactive-users?page=${page}`)
    },

    totalInactiveUsers(){
        return http().get(`${endPoints.users}/total-inactive-users`)
    },

    search(data){
        if(data.page==undefined) data.page =1;
        return http().get(`${endPoints.users}/search?page=${data.page}&date_from=${data.date_from}&date_to=${data.date_to}&query=${data.query}`)
    },

    approveUser(){
        return http().put(`${endPoints.users}/approve-user`)
    },

    rejectUser(){
        return http().put(`${endPoints.users}/reject-user`)
    },

    countries(provider=null){
        return http().get(`${endPoints.users}/countries?provider=${provider}`)
    }
}
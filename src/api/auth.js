import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    login(data){
        return http().post(`${endPoints.auth}/login`,data)
    },

    adminLogin(data){
        return http().post(`${endPoints.auth}/admin-login`,data)
    },

    register(data){
        return http().post(`${endPoints.auth}/register`,data)
    },

    logOut(){
        return http().post(`${endPoints.auth}/logout`)
    },

    user(){
        return http().get(`${endPoints.auth}/user`)
    },

    admin(){
        return http().get(`${endPoints.auth}/admin`)
    },
    
    resetPasswordLink(data){
        return http().post(`${endPoints.auth}/reset-password-link`,data)
    },
    
    resetPassword(data){
        return http().post(`${endPoints.auth}/reset-password`,data)
    },

    emailConfirmation(data){
        return http().post(`${endPoints.auth}/email-confirmation`,data)
    },

    resendEmailConfirmationCode(data){
        return http().post(`${endPoints.auth}/resend-email-confirmation`,data)
    },

    changePasswordLink(data){
        return http().post(`${endPoints.auth}/change-password-link`,data)
    },
    
    changePassword(data){
        return http().post(`${endPoints.auth}/change-password`,data)
    },
}
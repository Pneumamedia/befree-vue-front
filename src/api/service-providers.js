import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    all(){
        return http().get(`${endPoints.serviceProviders}`)
    },

    provider(id){
        return http().get(`${endPoints.serviceProviders}/${id}/provider`)
    },

    create(data){
        return http().post(`${endPoints.serviceProviders}/create`,data)
    },

    update(id,data){
        return http().put(`${endPoints.serviceProviders}/${id}/update`,data)
    }
}
import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    all(){
        return http().get(`${endPoints.charges}`)
    },

    charge(id){
        return http().get(`${endPoints.charges}/${id}/charge`)
    },

    create(data){
        return http().post(`${endPoints.charges}/create`,data)
    },

    update(id,data){
        return http().put(`${endPoints.charges}/${id}/update`,data)
    }
}
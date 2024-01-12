import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    all(){
        return http().get(`${endPoints.productServices}`)
    },

    service(id){
        return http().get(`${endPoints.productServices}/${id}/service`)
    },

    defaultService(service){
        return http().get(`${endPoints.productServices}/service?service=${service}`)
    },

    create(data){
        return http().post(`${endPoints.productServices}/create`,data)
    },

    update(id,data){
        return http().put(`${endPoints.productServices}/${id}/update`,data)
    }
}
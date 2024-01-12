import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    initiate(data){
        return http().post(`${endPoints.payments}/initiate`,data)
    },

    verify(data){
        return http().post(`${endPoints.payments}/verify`,data)
    }
}
import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    rates(){
        return http().get(`${endPoints.conversionRates}`)
    },

    rateById(id){
        return http().get(`${endPoints.conversionRates}/${id}/rate`)
    },

    liveRate(source_currency,destination_currency){
        return http().get(`${endPoints.conversionRates}/live-rate?source_currency=${source_currency}&destination_currency=${destination_currency}`)
    },

    rate(source_currency,destination_currency){
        return http().get(`${endPoints.conversionRates}/rate?source_currency=${source_currency}&destination_currency=${destination_currency}`)
    },

    create(data){
        return http().post(`${endPoints.conversionRates}/create`,data)
    },

    update(id,data){
        return http().put(`${endPoints.conversionRates}/${id}/update`,data)
    }
}
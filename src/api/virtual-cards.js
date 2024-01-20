import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    all(){
        return http().get(`${endPoints.virtualCards}`)
    },

    userCards(){
        return http().get(`${endPoints.virtualCards}/user-cards`)
    },

    create(data){
        return http().post(`${endPoints.virtualCards}`,data)
    },

    //user fund card
    fund(cardId,data){
        return http().post(`${endPoints.virtualCards}/${cardId}/fund`,data)
    },

    //admin fund card
    adminFund(cardId,ownerUUID,data){
        return http().post(`${endPoints.virtualCards}/${ownerUUID}/${cardId}/fund`,data)
    },

    //get card details
    details(cardId){
        return http().get(`${endPoints.virtualCards}/${cardId}/details`)
    },

    //freeze card
    freeze(cardId){
        return http().put(`${endPoints.virtualCards}/${cardId}/freeze`)
    },

    //unfreeze card
    unFreeze(cardId){
        return http().put(`${endPoints.virtualCards}/${cardId}/unfreeze`)
    },

    //liquidate card
    liquidate(cardId,data){
        return http().post(`${endPoints.virtualCards}/${cardId}/liquidate`,data)
    },

    //terminate card
    terminate(cardId){
        return http().get(`${endPoints.virtualCards}/${cardId}/terminate`)
    },

    //get card transactions
    transactions(cardId){
        return http().get(`${endPoints.virtualCards}/${cardId}/transactions`)
    },

    //admin get total number of cards
    totalCards(){
        return http().get(`${endPoints.virtualCards}/total-cards`)
    },

    //search cards
    searchCards(data){
        if(data.page==undefined) data.page = 1;
        return http().get(`${endPoints.virtualCards}/search-cards?page=${data.page}&date_from=${data.date_from}&date_to=${data.date_to}&query=${data.query}`)
    },

    cardsByStatus(data){
        if(data.page==undefined) data.page = 1;
        return http().get(`${endPoints.virtualCards}/status/${data.status}?page=${data.page}`)
    },

    //admin block card
    block(cardId){
        return http().patch(`${endPoints.virtualCards}/${cardId}/block`)
    },

    //admin unblock card
    unblock(cardId){
        return http().patch(`${endPoints.virtualCards}/${cardId}/unblock`)
    },

}
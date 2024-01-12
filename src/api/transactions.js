import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    userTransactions(){
        return http().post(`${endPoints.transactions}/user`)
    },

    userWalletTransactions(page=null){
        return http().get(`${endPoints.transactions}/user/wallet_account?page=${page}`)
    },

    userVirtualCardTransactions(){
        return http().get(`${endPoints.transactions}/user/virtual_card`)
    },

    all(){
        return http().get(`${endPoints.transactions}`)
    },

    details(txn_ref){
        return http().get(`${endPoints.transactions}/${txn_ref}/details`)
    },
}
import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    // create(){
    //     return http().post(`${endPoints.walletAccounts}/create`)
    // },

    /**
     * Admin fund wallet
     * @param {wallet account reference} accountId 
     * @param {*} data 
     * @returns 
     */
    fund(accountId,data){
        return http().post(`${endPoints.walletAccounts}/fund/${accountId}`,data)
    },

    /**
     * admin get wallet details
     * @param {*} accountId 
     * @returns 
     */
    details(accountId){
        return http().get(`${endPoints.walletAccounts}/details/${accountId}`)
    },

    userWalletDetails(userID=null){
        if(userID){
            return http().get(`${endPoints.walletAccounts}/${userID}/user-wallet-details`)
        }
        return http().get(`${endPoints.walletAccounts}/user-wallet-details`)
    },

    // balance(accountId){
    //     return http().get(`${endPoints.walletAccounts}/balance/${accountId}`)
    // },

    // transactions(accountId){
    //     return http().get(`${endPoints.walletAccounts}/transactions/${accountId}`)
    // },

    inflowOutFlow(accountId){
        return http().get(`${endPoints.walletAccounts}/inflow-outflow/${accountId}`)
    },

    balanceAnalysis(accountId){
        return http().get(`${endPoints.walletAccounts}/balance-analysis/${accountId}`)
    },

    /**
     * admin get total wallet balance
     * @returns admin get
     */
    totalWalletBalance(){
        return http().get(`${endPoints.walletAccounts}/total-wallet-balance`)
    },

    all(page){
        return http().get(`${endPoints.walletAccounts}?page=${page}`)
    },

    search(data){
        if(data.page==undefined) data.page =1;
        return http().get(`${endPoints.walletAccounts}/search?page=${data.page}&date_from=${data.date_from}&date_to=${data.date_to}&query=${data.query}`)
    }
}
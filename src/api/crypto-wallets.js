import endPoints from "./endpoints"
import {http} from './axios-config'

export default {

    coins(){
        return http().get(`${endPoints.cryptoWallets}/coins`)
    },

    createAddress(data){
        return http().post(`${endPoints.cryptoWallets}/create-address`,data)
    },

    addresses(){
        return http().get(`${endPoints.cryptoWallets}/addresses`)
    },

    allAddresses(){
        return http().get(`${endPoints.cryptoWallets}/all-addresses`)
    },

    networkChains(coin){
        return http().get(`${endPoints.cryptoWallets}/asset-chains/${coin}`)
    },

    transactions(user_uuid=null){
        return user_uuid ? http().get(`${endPoints.cryptoWallets}/transactions/${user_uuid}`)
        : http().get(`${endPoints.cryptoWallets}/transactions`) 
    },

    searchWallet(data,user_uuid=null){
        if(data.page==undefined) data.page =1;
        return user_uuid ? http().get(`${endPoints.cryptoWallets}/search-wallet/${user_uuid}?page=${data.page}&date_from=${data.date_from}&date_to=${data.date_to}&query=${data.query}`)
        : http().get(`${endPoints.cryptoWallets}/search-wallet?page=${data.page}&date_from=${data.date_from}&date_to=${data.date_to}&query=${data.query}`) 
    },

    searchTransactions(data,user_uuid=null){
        if(data.page==undefined) data.page =1;
        return user_uuid ? http().get(`${endPoints.cryptoWallets}/search-transactions/${user_uuid}?page=${data.page}&date_from=${data.date_from}&date_to=${data.date_to}&query=${data.query}`)
        : http().get(`${endPoints.cryptoWallets}/search-transactions?page=${data.page}&date_from=${data.date_from}&date_to=${data.date_to}&query=${data.query}`) 
    },


}
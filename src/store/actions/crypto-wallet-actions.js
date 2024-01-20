import api from '@/api/crypto-wallets'
import {notification} from '@/util/notification'

export default{

    async getCoins({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.coins()
            if(res.status==200){
               commit('cryptoCoins',res.data.data)
            }else{
                notification.warning(res.data.message)
            }
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getAllAddresses({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.allAddresses()
            if(res.status==200){
               commit('cryptoAddresses',res.data.data.data)

               commit('cryptoAddressCurrentPage',res.data.data.current_page)
               commit('cryptoAddressLastPage',res.data.data.last_page)
               commit('cryptoAddressPerPage',res.data.data.per_page)
               commit('cryptoAddressTotalPages',res.data.data.total)
            }else{
                notification.warning(res.data.message)
            }
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getAddresses({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.addresses()
            if(res.status==200){
               commit('cryptoAddresses',res.data.data)
            }else{
                notification.warning(res.data.message)
            }
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async fetchNetworkChains({commit},coin){
        try {
            commit('submitting',null,{root:true})
            const res = await api.networkChains(coin)
            if(res.status==200){
                //console.log(res.data.data)
                commit('cryptoChains',res.data.data)
               //notification.success(res.data)
            }else{
                notification.error(res.data.message)
            }
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async createAddress({commit,dispatch},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.createAddress(data)
            if(res.status==200){
                dispatch('getAddresses')
            }
            
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async getTransactions({commit},user_uuid=null){
        try {
            commit('submitting',null,{root:true})
            const res = await api.transactions(user_uuid)
            if(res.status==200){
               commit('cryptoTransactions',res.data.data.data)
               //console.log(res.data.data)

               commit('cryptoTransCurrentPage',res.data.data.current_page)
               commit('cryptoTransLastPage',res.data.data.last_page)
               commit('cryptoTransPerPage',res.data.data.per_page)
               commit('cryptoTransTotalPages',res.data.data.total)
               notification.success(res.data.message)
            }else{
                notification.error(res.data.message)
            }
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async searchTransactions({commit},{data,user_uuid=null}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.searchTransactions(data,user_uuid)

            commit('cryptoTransactions',res.data.data.data)
            commit('cryptoTransCurrentPage',res.data.data.current_page)
            commit('cryptoTransLastPage',res.data.data.last_page)
            commit('cryptoTransPerPage',res.data.data.per_page)
            commit('cryptoTransTotalPages',res.data.data.total)
            
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async searchWallet({commit},{data,user_uuid=null}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.searchWallet(data,user_uuid)

            commit('cryptoAddresses',res.data.data.data)
            commit('cryptoAddressCurrentPage',res.data.data.current_page)
            commit('cryptoAddressLastPage',res.data.data.last_page)
            commit('cryptoAddressPerPage',res.data.data.per_page)
            commit('cryptoAddressTotalPages',res.data.data.total)
            
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },
}

const LogError = (commit,err,commitType)=>{
    if(err.response !== undefined){
        let {response} = err
        //console.log(err.response)
        response.status==422 ? notification.warning(response.data.message) : (response.data.message != undefined) 
        ? notification.warning(response.data.message) : notification.warning('An error occred')
    }else{
        //console.log(err)
        notification.warning("Response not found")
    }
    commit(commitType,null,{root:true})
}

import api from '@/api/transactions'
import {notification} from '@/util/notification'

export default{

    async getDetails({commit},txn_ref){
        try {
            commit('loading',null,{root:true})
            const res = await api.details(txn_ref)
            commit('details',res.data.data)
            //processResponse(commit,res,'wallet_account')
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getUserTransactions({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.userTransactions()
            //processResponse(commit,res,'user','user updated successfully')
            commit('userTransactions',res.data.data)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getUserWalletTransactions({commit},page=null){
        try {
            commit('loading',null,{root:true})
            const res = await api.userWalletTransactions(page)
            //processResponse(commit,res,'user','user updated successfully')
            commit('userWalletTransactions',res.data.data.data)
            //alert(res.data.data.last_page)
            commit('walletTransCurrentPage',res.data.data.current_page)
            commit('walletTransLastPage',res.data.data.last_page)
            commit('walletTransPerPage',res.data.data.per_page)
            commit('walletTransTotalPages',res.data.data.total)

            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getUserVirtualCardTransactions({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.userVirtualCardTransactions()
            //processResponse(commit,res,'user','user updated successfully')
            commit('userVirtualCardTransactions',res.data.data.data)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getAllTransactions({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.all()
            //processResponse(commit,res,'user','user updated successfully')
            commit('allTransactions',res.data.data.data)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    }
}

const LogError = (commit,err,commitType)=>{
    if(err.response !== undefined){
        let {response} = err
        //console.log(err.response)
        response.status==422 ? notification.error(response.data.message) : (response.data.message != undefined) 
        ? notification.error(response.data.message) : notification.error('An error occred')
    }else{
        console.log(err)
        notification.error("Response not found")
    }
    commit(commitType,null,{root:true})
}


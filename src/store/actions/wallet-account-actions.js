import api from '@/api/wallet_account'
import {notification} from '@/util/notification'

export default {

    async getAll({commit},page){
        try {
            commit('loading',null,{root:true})
            const res = await api.all(page)
           
            commit('walletAccounts',res.data.data.data)
            commit('wAccountCurrentPage',res.data.data.current_page)
            commit('wAccountLastPage',res.data.data.last_page)
            commit('wAccountPerPage',res.data.data.per_page)
            commit('wAccountTotalPages',res.data.data.total)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async search({commit},data){
        try {
            commit('loading',null,{root:true})
            const res = await api.search(data)
           
            commit('walletAccounts',res.data.data.data)
            commit('wAccountCurrentPage',res.data.data.current_page)
            commit('wAccountLastPage',res.data.data.last_page)
            commit('wAccountPerPage',res.data.data.per_page)
            commit('wAccountTotalPages',res.data.data.total)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async create({commit}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.create()
            if(res.status==200){
                commit('walletAccount',res.data)
            }else{
                notification.error(res.message)
            }
            commit('submitted',null,{root:true})
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async getDetails({commit},id){
        try {
            commit('loading',null,{root:true})
            const res = await api.details(id)
            commit('walletAccount',res.data.data)
            processResponse(commit,res,'walletAccount')
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getUserWalletDetails({commit},user_uuid=null){
        try {
            commit('loading',null,{root:true})
            const res = await api.userWalletDetails(user_uuid)
            if(res.status == 200){
                commit('walletAccount',res.data.data)
            }else{
                notification.error("Error, unable to get wallet details")
            }
            //processResponse(commit,res,'wallet_account')
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async fund({commit},{id,data}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.fund(id,data)
            //processResponse(commit,res,'walletAccount','Account funded successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async getTransactions({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.transactions()
            //processResponse(commit,res,'user','user updated successfully')
            commit('transactions',res.data.data)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getInflowOutFlow({commit},accountId){
        try {
            commit('loading',null,{root:true})
            const res = await api.inflowOutFlow(accountId)
            //processResponse(commit,res,'user','user updated successfully')
            commit('inflowOutFlow',res.data.data)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getBalanceAnalysis({commit},accountId){
        try {
            commit('loading',null,{root:true})
            const res = await api.balanceAnalysis(accountId)
            //processResponse(commit,res,'user','user updated successfully')
            commit('balanceAnalysis',res.data.data.data)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getTotalWalletBalance({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.totalWalletBalance()
            //processResponse(commit,res,'user','user updated successfully')
            commit('totalWalletBalance',res.data.data)
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
        response.status==422 ? notification.warning(response.data.message) : (response.data.message != undefined) 
        ? notification.warning(response.data.message) : notification.warning('An error occred')
    }else{
        console.log(err)
        notification.warning("Response not found")
    }
    commit(commitType,null,{root:true})
}

const processResponse = (commit,res,commitType,successMsg=null)=>{
    if(res.status !== undefined){
        let {status,message,data} = res
        if(status==200){
           if(commit) commit(commitType,data)
           if(successMsg) notification.success(successMsg)
        }else{
            notification.warning(message)
        }
    }else{
        notification.warning("response not found")
    }
}
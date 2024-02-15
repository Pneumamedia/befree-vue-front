import api from '@/api/virtual-cards'
import {notification} from '@/util/notification'

export default {

    async getAll({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.all()
            if(res.status==200){
                commit('vCardAction','virtualCardStore/getAll')
                commit('virtualCards',res.data.data.data)
                commit('vCardsCurrentPage',res.data.data.current_page)
                commit('vCardsLastPage',res.data.data.last_page)
                commit('vCardsPerPage',res.data.data.per_page)
                commit('vCardsTotalPages',res.data.data.total)
                notification.success(res.data.message)
            }else{
                notification.warning(res.message)
            }
            commit('loaded',null,{root:true})
            return res.data
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getCardByStatus({commit},data){
        try {
            commit('loading',null,{root:true})
            const res = await api.cardsByStatus(data)
            if(res.status==200){
                commit('virtualCards',res.data.data.data)
                commit('vCardAction','virtualCardStore/getCardByStatus')
                commit('vCardsCurrentPage',res.data.data.current_page)
                commit('vCardsLastPage',res.data.data.last_page)
                commit('vCardsPerPage',res.data.data.per_page)
                commit('vCardsTotalPages',res.data.data.total)
                notification.success(res.data.message)
            }else{
                notification.warning(res.message)
            }
            commit('loaded',null,{root:true})
            return res.data
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async create({commit},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.create(data)
            if(res.status==200){
                commit('addVirtualCard',res.data.data)
                notification.success(res.data.message)
            }else{
                notification.warning(res.message)
            }
            commit('submitted',null,{root:true})
            return res.data
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async adminCreate({commit},{ownerUUID,data}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.adminCreate(ownerUUID,data)
            if(res.status==200){
                commit('addVirtualCard',res.data.data)
                notification.success(res.data.message)
            }else{
                notification.warning(res.message)
            }
            commit('submitted',null,{root:true})
            return res.data
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async getCardDetails({commit},id){
        try {
            commit('loading',null,{root:true})
            const res = await api.details(id)
            commit('virtualCardDetails',res.data.data)
            //processResponse(commit,res,'wallet_account')
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getUserCards({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.userCards()
            commit('userVirtualCards',res.data.data.data)
            commit('vCardsCurrentPage',res.data.data.current_page)
            commit('vCardsLastPage',res.data.data.last_page)
            commit('vCardsPerPage',res.data.data.per_page)
            commit('vCardsTotalPages',res.data.data.total)
            //processResponse(commit,res,'wallet_account')
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async fund({commit},{id,data}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.fund(id,data)
            processResponse(null,res,null,'Card funded successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async adminFund({commit},{id,ownerUUID,data}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.adminFund(id,ownerUUID,data)
            processResponse(null,res,null,'Card funded successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async freeze({commit},id){
        try {
            commit('submitting',null,{root:true})
            const res = await api.freeze(id)
            //processResponse(commit,res,'user','user updated successfully')
            processResponse(null,res,null,'Card freezed successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async unFreeze({commit},id){
        try {
            commit('submitting',null,{root:true})
            const res = await api.unFreeze(id)
            //processResponse(commit,res,'user','user updated successfully')
            processResponse(null,res,null,'Card unfreezed successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async block({commit},id){
        try {
            commit('submitting',null,{root:true})
            const res = await api.block(id)
            //processResponse(commit,res,'user','user updated successfully')
            processResponse(null,res,null,'Card blocked successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async unblock({commit},id){
        try {
            commit('submitting',null,{root:true})
            const res = await api.unblock(id)
            //processResponse(commit,res,'user','user updated successfully')
            processResponse(null,res,null,'Card unblocked successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async liquidate({commit},{id,data}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.liquidate(id,data)
            processResponse(null,res,null,'Card liquidated successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async getTotalCards({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.totalCards()
            commit('totalCards',res.data.data)
            //processResponse(null,res,null,'Card liquidated successfully')
            commit('loading',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async terminate({commit},id){
        try {
            commit('submitting',null,{root:true})
            const res = await api.terminate(id)
            processResponse(commit,res,null,'Card terminated successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async getCardStatement({commit},data){
        try {
            commit('loading',null,{root:true})
            const res = await api.statement(data)
            commit('cardStatement',res.data.data)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getCardStatementSummary({commit},data){
        try {
            commit('loading',null,{root:true})
            const res = await api.statementSummary(data)
            commit('cardStatementSummary',res.data.data)
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    /**
     * Admin get virtual-card transactions
     * @param {*} param0 
     * @param {*} id 
     * @returns 
     */
    async getTransactions({commit},id){
        try {
            commit('loading',null,{root:true})
            const res = await api.transactions(id)
            //processResponse(commit,res,'user','user updated successfully')
            commit('transactions',res.data.data.data)
            commit('vCardTransCurrentPage',res.data.data.current_page)
            commit('vCardTransLastPage',res.data.data.last_page)
            commit('vCardTransPerPage',res.data.data.per_page)
            commit('vCardTransTotalPages',res.data.data.total)

            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async search({commit},data){
        try {
            commit('loading',null,{root:true})
            const res = await api.searchCards(data)
            //processResponse(commit,res,'user','user updated successfully')
            commit('virtualCards',res.data.data.data)
            commit('vCardState',res.data.data.data)
            commit('vCardsCurrentPage',res.data.data.current_page)
            commit('vCardsPerPage',res.data.data.per_page)
            commit('vCardsLastPage',res.data.data.last_page)
            commit('vCardsTotalPages',res.data.data.total)

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
        notification.error("Response not found")
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
import api from '@/api/charges'
import {notification} from '@/util/notification'

export default{

    async getCharges({commit},data){
        try {
            commit('loading',null,{root:true})
            const res = await api.all(data)
            if(res.status==200){
               commit('charges',res.data.data)
               //notification.success(res.data.data)
            }else{
                notification.warning(res.data.message)
            }
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async create({commit,dispatch},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.create(data)
            if(res.status==200){
                dispatch('getCharges')
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

    async update({commit,dispatch},{id,data}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.update(id,data)
            if(res.status==200){
                dispatch('getCharges')
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

    async getCharge({commit},id){
        try {
            commit('submitting',null,{root:true})
            const res = await api.charge(id)
            if(res.status==200){
               commit('charge',res.data.data)
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

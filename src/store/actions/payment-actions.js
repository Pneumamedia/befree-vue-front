import api from '@/api/payments'
import {notification} from '@/util/notification'

export default{

    async initiate({commit},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.initiate(data)
            if(res.status==200){
                //commit('walletAccount',res.data)
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

    async verify({commit},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.verify(data)
            if(res.status==200){
                commit('transactionStore/addUserWalletTransaction',res.data.data,{root:true})
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

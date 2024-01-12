import api from '@/api/users'
import {notification} from '@/util/notification'

export default{

    async getUsers({commit},page=null){
        try {
            //alert()
            commit('loading',null,{root:true})
            const res = await api.users(page)
            
            if(res.status==200){
                
                commit('users',res.data.data.data)
                commit('userAction','userStore/getUsers')
                commit('userState',res.data.data.data)
                commit('usersCurrentPage',res.data.data.current_page)
                commit('usersLastPage',res.data.data.last_page)
                commit('usersPerPage',res.data.data.per_page)
                commit('usersTotalPages',res.data.data.total)
            }else{
                notification.error(res.message)
            }
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async searchUsers({commit},data){
        try {
            commit('loading',null,{root:true})
            const res = await api.search(data)
            
            if(res.status==200){
                
                commit('users',res.data.data.data)
                commit('userAction','userStore/getSearchUsers')
                commit('userState',res.data.data.data)
                commit('usersCurrentPage',res.data.data.current_page)
                commit('usersLastPage',res.data.data.last_page)
                commit('usersPerPage',res.data.data.per_page)
                commit('usersTotalPages',res.data.data.total)
                notification.warning("user fetched successfully")
            }else{
                notification.error(res.message)
            }
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getActiveUsers({commit},page=null){
        try {
            commit('loading',null,{root:true})
            const res = await api.activeUsers(page)
            if(res.status==200){
                commit('activeUsers',res.data.data.data)
                commit('userAction','userStore/getActiveUsers')
                commit('userState',res.data.data.data)
                commit('usersCurrentPage',res.data.data.current_page)
                commit('usersLastPage',res.data.data.last_page)
                commit('usersPerPage',res.data.data.per_page)
                commit('usersTotalPages',res.data.data.total)
            }else{
                notification.error(res.message)
            }
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getInactiveUsers({commit},page=null){
        try {
            commit('loading',null,{root:true})
            const res = await api.inactiveUsers(page)
            if(res.status==200){
                commit('inactiveUsers',res.data.data.data)
                commit('userAction','userStore/getInactiveUsers')
                commit('userState',res.data.data.data)
                commit('usersCurrentPage',res.data.data.current_page)
                commit('usersLastPage',res.data.data.last_page)
                commit('usersPerPage',res.data.data.per_page)
                commit('usersTotalPages',res.data.data.total_pages)
            }else{
                notification.error(res.message)
            }
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getTotalUsers({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.totalUsers()
            commit('totalUsers',res.data.data)
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getTotalActiveUsers({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.totalActiveUsers()
            commit('totalActiveUsers',res.data.data)
            //processResponse(commit,res,'totalActiveUsers')
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded') 
        }
    },

    async getTotalInactiveUsers({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.totalInactiveUsers()
            //alert(res.data.data)
            commit('totalInactiveUsers',res.data.data)
            
            //processResponse(commit,res,'totalActiveUsers')
            commit('loaded',null,{root:true})
        } catch (error) {
            LogError(commit,error,'loaded') 
        }
    },

    async create({commit},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.create(data)
            processResponse(commit,res,'user','storeUser created successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async updateUser({commit},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.updateUser(data)
            processResponse(commit,res,'user','user updated successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async delete({commit},id){
        try {
            commit('submitting',null,{root:true})
            const res = await api.delete(id)
            processResponse(commit,res,'submitted',"User deleted successfully")
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async createProfile({commit},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.createProfile(data)
            commit('profile',res.data)
            //alert(res.data._id)
            processResponse(commit,res,'profile','Profile created successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async updateProfile({commit},data){
        try {
            commit('submitting',null,{root:true})
            const res = await api.updateProfile(data)
            //commit('profile',res.data)
            //alert(res.data._id)
            processResponse(null,res,null,'Profile updated successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async getProfileDetails({commit}){
        try {
            commit('loading',null,{root:true})
            const res = await api.profileDetails()
            commit('profile',res.data.data)
            //alert(res.data._id)
            //processResponse(commit,res,'profilePhoto','')
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getUserProfileDetails({commit},id){
        try {
            commit('loading',null,{root:true})
            const res = await api.userProfileDetails(id)
            commit('profile',res.data.data)
            //alert(res.data._id)
            //processResponse(commit,res,'profilePhoto','')
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getStates({commit},country){
        try {
            commit('loading',null,{root:true})
            const res = await api.states(country)
            
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async getCountries({commit},provider=null){
        try {
            commit('loading',null,{root:true})
            const res = await api.countries(provider)
            
            commit('loaded',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'loaded')
        }
    },

    async approveUser({commit}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.approveUser()
            notification.success('User approved successfully')
            commit('submitted',null,{root:true})
            return res
        } catch (error) {
            LogError(commit,error,'submitted')
        }
    },

    async rejectUser({commit}){
        try {
            commit('submitting',null,{root:true})
            const res = await api.rejectUser()
            notification.success('User rejected successfully')
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
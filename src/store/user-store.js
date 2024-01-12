import actions from '../store/actions/user-actions'
import getters from '../store/getters/user-getters'
import mutations from '../store/mutations/user-mutations'

export default{
    namespaced:true,
    state(){
        return{
            users:[],
            activeUsers:[],
            inactiveUsers:[],
            totalUsers:null,
            totalActiveUsers:null,
            totalInactiveUsers:null,
            profile:{},
            userAction:null,
            userState:null,

            usersCurrentPage:1,
            usersLastPage:1,
            usersPerPage:1,
            usersTotalPages:1,
        }
    },
    actions:{
        ...actions
    },
    getters:{
        ...getters
    },
    mutations:{
        ...mutations
    }
}
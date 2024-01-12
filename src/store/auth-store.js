import actions from '../store/actions/auth-actions'
import getters from '../store/getters/auth-getters'
import mutations from '../store/mutations/auth-mutations'

export default{
    namespaced:true,
    state(){
        return{
            authUser:{},
            authAdmin:{},
            isAdmin:false
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
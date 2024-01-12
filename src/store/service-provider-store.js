import actions from '../store/actions/service-provider-actions'
import getters from '../store/getters/service-provider-getters'
import mutations from '../store/mutations/service-provider-mutations'


export default{
    namespaced:true,
    state(){
        return{
            serviceProviders:[],
            serviceProvider:{}
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
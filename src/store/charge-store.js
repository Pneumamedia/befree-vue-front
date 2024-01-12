import actions from '../store/actions/charge-actions'
import getters from '../store/getters/charge-getters'
import mutations from '../store/mutations/charge-mutations'


export default{
    namespaced:true,
    state(){
        return{
            charges:[],
            charge:{}
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
import actions from '../store/actions/conversion-rate-actions'
import getters from '../store/getters/conversion-rate-getters'
import mutations from '../store/mutations/conversion-rates-mutations'


export default{
    namespaced:true,
    state(){
        return{
            conversionRates:[],
            conversionRate:{}
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
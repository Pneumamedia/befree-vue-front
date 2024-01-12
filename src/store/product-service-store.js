import actions from '../store/actions/product-service-actions'
import getters from '../store/getters/product-service-getters'
import mutations from '../store/mutations/product-service-mutations'


export default{
    namespaced:true,
    state(){
        return{
            productServices:[],
            productService:{}
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
import actions from '../store/actions/transaction-actions'
import getters from '../store/getters/transaction-getters'
import mutations from '../store/mutations/transaction-mutations'

export default{
    namespaced:true,
    state(){
        return{
            allTransactions:[],
            userTransactions:[],
            userWalletTransactions:[],
            userVirtualCardTransactions:[],
            details:{},

            walletTransCurrentPage:1,
            walletTransLastPage:1,
            walletTransPerPage:1,
            walletTransTotalPages:1,

            vCardTransCurrentPage:1,
            vCardTransLastPage:1,
            vCardTransPerPage:1,
            vCardTransTotalPages:1
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
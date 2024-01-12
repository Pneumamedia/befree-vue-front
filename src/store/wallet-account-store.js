import actions from '../store/actions/wallet-account-actions'
import getters from '../store/getters/wallet-account-getters'
import mutations from '../store/mutations/wallet-account-mutations'

export default {
    namespaced:true,
    state(){
        return{
            walletAccounts:[],
            walletAccount:{},
            transactions:[],
            //balance:null,
            inflowOutFlow:{},
            balanceAnalysis:[],
            totalWalletBalance:0,
            
            wAccountCurrentPage:1,
            wAccountLastPage:1,
            wAccountPerPage:1,
            wAccountTotalPages:1,
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
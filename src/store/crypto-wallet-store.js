import actions from '../store/actions/crypto-wallet-actions'
import getters from '../store/getters/crypto-wallet-getters'
import mutations from '../store/mutations/crypto-wallet-mutations'


export default{
    namespaced:true,
    state(){
        return{
            cryptoTransactions:[],
            cryptoAddresses:[],
            cryptoCoins:null,
            cryptoChains:null,

            cryptoAddressCurrentPage:1,
            cryptoAddressLastPage:1,
            cryptoAddressPerPage:1,
            cryptoAddressTotalPages:1,

            cryptoTransCurrentPage:1,
            cryptoTransLastPage:1,
            cryptoTransPerPage:1,
            cryptoTransTotalPages:1,
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
import actions from '../store/actions/virtual-card-actions'
import getters from '../store/getters/virtual-card-getters'
import mutations from '../store/mutations/virtual-card-mutations'

export default {
    namespaced:true,
    state(){
        return{
            virtualCards:[],
            virtualCardDetails:{},
            userVirtualCards:[],
            transactions:[],
            totalCards:null,
            cardStatement:[],
            cardStatementSummary:null,

            vCardAction:null,
            vCardState:null,

            vCardsCurrentPage:1,
            vCardsLastPage:1,
            vCardsPerPage:1,
            vCardsTotalPages:1,

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
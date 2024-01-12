
export default {

    virtualCards(state){
        return state.virtualCards
    },

    userVirtualCards(state){
        return state.userVirtualCards
    },

    transactions(state){
        return state.transactions
    },

    virtualCardDetails(state){
        return state.virtualCardDetails
    },

    totalCards(state){
        return state.totalCards
    },

    vCardsCurrentPage(state){
        return state.vCardsCurrentPage
    },
    vCardsLastPage(state){
        return state.vCardsLastPage
    },
    vCardsPerPage(state){
        return state.vCardsPerPage
    },
    vCardsTotalPages(state){
        return state.vCardsTotalPages
    },
    vCardTransCurrentPage(state){
        return state.vCardTransCurrentPage
    },

    vCardTransLastPage(state){
        return state.vCardTransLastPage
    },

    vCardTransPerPage(state){
        return state.vCardTransPerPage
    },

    vCardTransTotalPages(state){
        return state.vCardTransTotalPages
    },

    vCardAction(state){
        return state.vCardAction
    }


}
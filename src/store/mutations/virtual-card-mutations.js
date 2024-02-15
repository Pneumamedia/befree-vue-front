
export default {

    virtualCards(state,data){
         state.virtualCards = data
    },

    userVirtualCards(state,data){
         state.userVirtualCards = data
    },

    addVirtualCard(state,data){
         state.userVirtualCards.push(data)
    },

    virtualCardDetails(state,data){
         state.virtualCardDetails = data
    },

    transactions(state,data){
         state.transactions = data
    },

    totalCards(state,data){
         state.totalCards = Number(data)
    },

    cardStatement(state,data){
          return state.cardStatement = data
     },

     cardStatementSummary(state,data){
          return state.cardStatementSummary = data
     },

    vCardsCurrentPage(state,data){
         state.vCardsCurrentPage = data
    },

    vCardsLastPage(state,data){
         state.vCardsLastPage = data
    },

    vCardsPerPage(state,data){
         state.vCardsPerPage = data
    },

    vCardsTotalPages(state,data){
         state.vCardsTotalPages = data
    },

    vCardTransCurrentPage(state,data){
        state.vCardTransCurrentPage = data
    },
    vCardTransLastPage(state,data){
        state.vCardTransLastPage = data
    },
    vCardTransPerPage(state,data){
        state.vCardTransPerPage = data
    },
    vCardTransTotalPages(state,data){
        state.vTransTotalPages = data
    },

     vCardAction(state,data){
       state.vCardAction = data
     },

     vCardState(state,data){
        state.vCardState = data
     }
}
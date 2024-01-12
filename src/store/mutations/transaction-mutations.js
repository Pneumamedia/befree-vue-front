export default {
    
    allTransactions(state,data){
        state.allTransactions = data
    },

    userTransactions(state,data){
        state.userTransactions = data;
    },

    userWalletTransactions(state,data){
        state.userWalletTransactions = data;
    },

    userVirtualCardTransactions(state,data){
        state.userVirtualCardTransactions = data;
    },

    addUserWalletTransaction(state,data){
        state.userWalletTransactions.push(data);
    },

    addUserVirtualCardTransaction(state,data){
        state.userVirtualCardTransactions.push(data);
    },

    details(state,data){
        state.details = data
    },

    walletTransCurrentPage(state,data){
         state.walletTransCurrentPage = data
    },
    walletTransLastPage(state,data){
         state.walletTransLastPage = data
    },
    walletTransPerPage(state,data){
         state.walletTransPerPage = data
    },
    walletTransTotalPages(state,data){
         state.walletTransTotalPages = data
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
    }
}
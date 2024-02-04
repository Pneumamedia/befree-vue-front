
export default {

    allTransactions(state){
        return state.allTransactions
    },

    userTransactions(state){
        return state.userTransactions
    },

    userWalletTransactions(state){
        return state.userWalletTransactions
    },

    systemFeesCharge(state){
        return state.systemFeesCharge
    },

    totalSystemFeesCharge(state){
        return state.totalSystemFeesCharge
    },

    userVirtualCardTransactions(state){
        return state.userVirtualCardTransactions
    },

    walletTransCurrentPage(state){
        return state.walletTransCurrentPage
    },

    walletTransLastPage(state){
        return state.walletTransLastPage
    },

    walletTransPerPage(state){
        return state.walletTransPerPage
    },

    walletTransTotalPages(state){
        return state.walletTransTotalPages
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
    }
}
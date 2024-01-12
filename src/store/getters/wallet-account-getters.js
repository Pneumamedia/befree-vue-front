
export default {

    walletAccounts(state){
        return state.walletAccounts
    },

    walletAccount(state){
        return state.walletAccount
    },

    balance(state){
        return state.balance
    },

    transactions(state){
        return state.transactions
    },

    inflowOutFlow(state){
        return state.inflowOutFlow
    },

    balanceAnalysis(state){
        return state.balanceAnalysis
    },

    totalWalletBalance(state){
        return state.totalWalletBalance
    },

    wAccountCurrentPage(state){
        return state.wAccountCurrentPage
    },
    wAccountLastPage(state){
        return state.wAccountLastPage
    },
    wAccountPerPage(state){
        return state.wAccountPerPage
    },
    wAccountTotalPages(state){
        return state.wAccountTotalPages
    }
}
export default {
    
    walletAccounts(state,data){
        state.walletAccounts = data
    },

    walletAccount(state,data){
        state.walletAccount = data
    },

    transactions(state,data){
        state.transactions.push(data)
    },

    balance(state,data){
        state.balance = Number(data) 
    },

    inflowOutFlow(state,data){
         state.inflowOutFlow = data
    },

    balanceAnalysis(state,data){
         state.balanceAnalysis = data
    },

    totalWalletBalance(state,data){
         state.totalWalletBalance = Number(data)
    },

    wAccountCurrentPage(state,data){
        //alert(data)
       state.wAccountCurrentPage = data
    },
    wAccountLastPage(state,data){
        state.wAccountLastPage = data
    },
    wAccountPerPage(state,data){
       state.wAccountPerPage = data
    },
    wAccountTotalPages(state,data){
        state.wAccountTotalPages = data
    }
}
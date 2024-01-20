
export default {

    cryptoTransactions(state,data){
         state.cryptoTransactions = data
    },

    cryptoAddresses(state,data){
          state.cryptoAddresses = data
    },

    cryptoCoins(state,data){
        state.cryptoCoins = data
    },

    cryptoChains(state,data){
        //console.log(data)
        state.cryptoChains = data
    },

    cryptoAddressCurrentPage(state,data){
         state.cryptoAddressCurrentPage = data
    },

    cryptoAddressLastPage(state,data){
         state.cryptoAddressLastPage = data
    },

    cryptoAddressPerPage(state,data){
         state.cryptoAddressPerPage = data
    },

    cryptoAddressTotalPages(state,data){
         state.cryptoAddressTotalPages = data
    },

    cryptoTransCurrentPage(state,data){
         state.cryptoTransCurrentPage = data
    },

    cryptoTransLastPage(state,data){
         state.cryptoTransLastPage = data
    },

    cryptoTransPerPage(state,data){
         state.cryptoTransPerPage = data
    },

    cryptoTransTotalPages(state,data){
         state.cryptoTransTotalPages = data
    },
}
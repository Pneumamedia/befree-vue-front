import Vue from "vue";
import Vuex from "vuex";
import authStore from "./auth-store";
import userStore from "./user-store";
import walletAccountStore from "./wallet-account-store";
import paymentStore from "./payment-store";
import transactionStore from "./transaction-store";
import virtualCardStore from "./virtual-card-store";
import serviceProviderStore from "./service-provider-store";
import productServiceStore from "./product-service-store";
import chargeStore from "./charge-store";
import conversionRateStore from "./conversion-rate-store";
import cryptoWalletStore from "./crypto-wallet-store";

Vue.use(Vuex)

export default new Vuex.Store({
  state(){
    return{
        submitting:false,
        loading:false,
        activeMenu:null
    }
  },
  
  mutations: {
    loading(state){
      state.loading =true
    },
    loaded(state){
        state.loading = false
    },
    submitting(state){
        state.submitting = true
    },
    submitted(state){
        state.submitting = false
    }
  },
  
  modules:{
    authStore,
    userStore,
    walletAccountStore,
    paymentStore,
    transactionStore,
    virtualCardStore,
    serviceProviderStore,
    productServiceStore,
    chargeStore,
    conversionRateStore,
    cryptoWalletStore
  }
})

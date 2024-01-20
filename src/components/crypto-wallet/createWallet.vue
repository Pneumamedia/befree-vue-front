<template>
    <div class="row">
        <div class="col-md-8">
            <div class="card mb-3">
                <div class="card-header">
                    <h6>Crypto Wallets</h6>
                </div>
                <div class="card-body">
                    <div class="table-responsive">
                        <table class="table table-hover table-bordered">
                            <tr>
                                <th><strong>S/N</strong></th>
                                <th>Wallet address</th>
                                <th>Coin</th>
                                <th>Network Chain</th>
                                <th>Purpose</th>
                                <th>Date</th>
                            </tr> 
                                
                            <tr v-if="loading">
                                <td colspan="7">
                                    <b-skeleton-table
                                        :rows="3"
                                        :columns="5"
                                        :table-props="{ bordered: true, striped: true }"
                                    ></b-skeleton-table>
                                </td>
                            </tr>
                            <template v-else>
                                <tr v-if="cryptoAddresses.length == 0">
                                    <td colspan="7">There are no wallets</td>
                                </tr>
                                <tr v-else v-for="address,i in cryptoAddresses" :key="i">
                                    <td>{{++i}}</td>
                                    <td>{{address.wallet_address}}</td>
                                    <td>{{address.coin}}</td>
                                    <td>{{address.network_chain}}</td>
                                    <td>{{address.purpose}}</td>
                                    <td>{{address.created_at}}</td>
                                </tr>
                            </template>                                                                                                                                                                                                                                                                   
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="card mb-3">
                <div class="card-header">
                    <h6>Create Crypto Wallet</h6>
                </div>
                <div class="card-body">
                    <form class="form-horizontal form-materia" id="cypto-wallet-form" enctype="multipart/form-data" @submit.prevent="submit()">
                        <div class="form-group">
                            <label class="col-md-12">Coins<span class="red-text">*</span></label>
                            <div class="col-md-12">
                                <select v-model="coin" @change="fetchChains()" class="form-control form-control-line">
                                    <option :value=null> Select Coin</option>
                                    <option v-for="coin,i in cryptoCoins" :key="i">{{coin}}</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-12">Network chains<span class="red-text">*</span></label>
                            <div class="col-md-12">
                                <select v-model="form.assetId" required class="form-control form-control-line">
                                    <option :value=null> Select Chain</option>
                                    <option v-for="chain,i in cryptoChains" :key="i" :value="`${chain+':'+i}`">{{i}} {{chain}}</option>
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-12">
                                <span v-if="submitting || loading" class="btn btn-primary btn-sm">...</span>
                                <button v-else class="btn btn-sm btn-primary float-right mb-2" id="add-incentives">Create</button>
                            </div>
                        </div>
                    </form> 
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
export default {

    data(){
        return{
            form:{
                assetId:null,
                purpose:"Fund Collection",
                networkChain:null
            },
            coin:null
        }
    },

    computed:{
        ...mapState({
                loading:state=>state.loading,
                submitting:state=>state.submitting
            }),

        ...mapGetters('cryptoWalletStore',['cryptoCoins','cryptoAddresses','cryptoChains']),
    },

    created(){
        if(this.cryptoCoins==null) this.getCoins()
        
        if(this.cryptoAddresses.length==0) this.getAddresses()
    },

    methods:{
        ...mapActions('cryptoWalletStore',['getCoins','fetchNetworkChains','createAddress','getAddresses']),

        fetchChains(){
           this.fetchNetworkChains(this.coin)
        },

        submit(){
            let strSplit = this.form.assetId.split(':')
            this.form.assetId = strSplit[0]
            this.form.networkChain = strSplit[1]
            this.createAddress(this.form)
        },
    }
}
</script>


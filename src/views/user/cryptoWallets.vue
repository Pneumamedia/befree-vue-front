<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h4>Crypto Wallet System</h4>
                    </div>
                </div>
            </div>
        </div>

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
                                        <td>{{address.wallet_address}} <span @click="copyText(address)" title="copy wallet address" class="copy icon icon-copy blue-text"></span></td>
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

                            <!-- <div class="form-group">
                                <label class="col-md-12">Purpose</label>
                                <div class="col-md-12">
                                    <textarea v-model="form.purpose" readonly value="Fund Collection" class="form-control form-control-line">Fund Collection</textarea>
                                </div>
                            </div> -->

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
        
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h6>Crypto Transactions</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th><strong>S/N</strong></th>
                                    <th>Wallet address</th>
                                    <th>Source wallet address</th>
                                    <th>Network</th>
                                    <th>Coin</th>
                                    <th>Operation</th>
                                    <th>Status</th>
                                    <th>Amount</th>
                                    <th>Amount(USD)</th>
                                    <th>Converted</th>
                                    <th>Date</th>
                                </tr> 
                                    
                                <tr v-if="loading">
                                    <td colspan="11">
                                        <b-skeleton-table
                                            :rows="3"
                                            :columns="5"
                                            :table-props="{ bordered: true, striped: true }"
                                        ></b-skeleton-table>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr v-if="cryptoTransactions.length == 0">
                                        <td colspan="11">There are no Transactions</td>
                                    </tr>
                                    <tr v-else v-for="trans,i in cryptoTransactions" :key="i">
                                        <td>{{++i}}</td>
                                        <td>{{trans.destination_address}}</td>
                                        <td>{{trans.source_address}}</td>
                                        <td>{{trans.asset_id}}</td>
                                        <td>{{trans.coin}}</td>
                                        <td>{{trans.operation}}</td>
                                        <td>{{trans.status}}</td>
                                        <td>{{trans.amount}}</td>
                                        <td>{{trans.amount_usd}}</td>
                                        <td>{{trans.converted?'successful':'pending'}}</td>
                                        <td>{{trans.created_at}}</td>
                                    </tr>
                                </template>                                                                                                                                                                                                                                                                   
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .copy{
        cursor: pointer !important;
    }
</style>

<script>
import {mapActions,mapGetters,mapState} from 'vuex'
import {notification} from '@/util/notification'
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

        ...mapGetters('cryptoWalletStore',['cryptoCoins','cryptoAddresses','cryptoTransactions','cryptoChains']),
        ...mapGetters('authStore',['authUser'])

        
    },

    created(){
        console.log(this.authUser.id)
        if(this.cryptoCoins==null) this.getCoins()
        
        if(this.cryptoAddresses.length==0) this.getAddresses()

        if(this.cryptoTransactions.length==0) this.getTransactions(this.authUser.user_uuid)
    },

    methods:{
        ...mapActions('cryptoWalletStore',['getCoins','fetchNetworkChains','createAddress','getAddresses','getTransactions']),

        fetchChains(){
           this.fetchNetworkChains(this.coin)
        },

        submit(){
            let strSplit = this.form.assetId.split(':')
            this.form.assetId = strSplit[0]
            this.form.networkChain = strSplit[1]
            this.createAddress(this.form)
        },

        async copyText(address) {
            try{
                var copyText = address.wallet_address;

                await navigator.clipboard.writeText(copyText);

                notification.info("Wallet address copied to clipboard")
            }catch(err){
                console.log('Unable to copy to clipboard')
            }
            
        }
    }
}
</script>
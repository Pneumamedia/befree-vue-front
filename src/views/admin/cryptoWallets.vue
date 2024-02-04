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
            <div class="col-md-12">
                <form @submit.prevent="searchAddress()">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <input type="date" v-model="walletSearchForm.date_from" class="form-control"  placeholder="Date from ">
                                </div>

                                <div class="col-md-3">
                                    <input type="date" v-model="walletSearchForm.date_to" class="form-control" placeholder="Date to">
                                </div><br>
                                <div class="col-md-3">
                                    <input type="text" v-model="walletSearchForm.query" class="form-control" required placeholder="email,name or uuid">
                                </div><br>
                                <div class="col-md-3">
                                    <span v-if="loading || submitting">...</span>
                                    <button v-else type="submit" id="submit" class="btn btn-primary">Search&nbsp;&nbsp;<i class="icon-search"></i></button>
                                </div>
                            </div>
                        </div>      
                    </div>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h6>Crypto Wallets</h6>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th><strong>S/N</strong></th>
                                    <th>Name</th>
                                    <th>Wallet address</th>
                                    <th>Coin</th>
                                    <th>Network Chain</th>
                                    <th>Purpose</th>
                                    <th>Date</th>
                                </tr> 
                                    
                                <tr v-if="loading">
                                    <td colspan="8">
                                        <b-skeleton-table
                                            :rows="3"
                                            :columns="5"
                                            :table-props="{ bordered: true, striped: true }"
                                        ></b-skeleton-table>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr v-if="cryptoAddresses.length == 0">
                                        <td colspan="8">There are no wallets</td>
                                    </tr>
                                    <tr v-else v-for="address,i in cryptoAddresses" :key="i">
                                        <td>{{++i}}</td>
                                        <td>{{address.owner_name}}</td>
                                        <td>{{address.wallet_address}} <span @click="copyText(address)" title="copy wallet address" class="copy icon icon-copy blue-text"></span></td>
                                        <td>{{address.coin}}</td>
                                        <td>{{address.network_chain}}</td>
                                        <td>{{address.purpose}}</td>
                                        <td>{{address.created_at}}</td>
                                    </tr>
                                </template>                                                                                                                                                                                                                                                                   
                            </table>
                        </div>
                        <template v-if="!loading">
                            <pagination v-if="isSearchingWallet" :action="'cryptoWalletStore/searchWallet'" :query_data="form" :current_page="cryptoAddressCurrentPage" :per_page="cryptoAddressPerPage" :total_pages="cryptoAddressTotalPages" :last_page="cryptoAddressLastPage"></pagination>
                            <pagination v-else :action="'cryptoWalletStore/getAllAddresses'" :current_page="cryptoAddressCurrentPage" :per_page="cryptoAddressPerPage" :total_pages="cryptoAddressTotalPages" :last_page="cryptoAddressLastPage"></pagination>
                        </template>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="row">
            <div class="col-md-12">
                <form @submit.prevent="searchTrans()">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-3">
                                    <input type="date" v-model="transSearchForm.date_from" class="form-control" placeholder="Date from">
                                </div>

                                <div class="col-md-3">
                                    <input type="date" v-model="transSearchForm.date_to" class="form-control" placeholder="Date to">
                                </div><br>
                                <div class="col-md-3">
                                    <input type="text" v-model="transSearchForm.query" required class="form-control" placeholder="email,name or uuid">
                                </div><br>
                                <div class="col-md-3">
                                    <span v-if="loading || submitting">...</span>
                                    <button v-else type="submit" id="submit" class="btn btn-primary">Search&nbsp;&nbsp;<i class="icon-search"></i></button>
                                </div>
                            </div>
                        </div>      
                    </div>
                </form>
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
                                    <!-- <th>Status</th> -->
                                    <th>Amount</th>
                                    <th>Amount(USD)</th>
                                    <th>Fee</th>
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
                                        <td>{{trans.fee}}</td>
                                        <td>{{trans.converted?'successful':'pending'}}</td>
                                        <td>{{trans.updated_at}}</td>
                                    </tr>
                                </template>                                                                                                                                                                                                                                                                   
                            </table>
                        </div>
                        <template v-if="!loading">
                            <pagination v-if="isSearching" :action="'cryptoWalletStore/searchTransactions'" :query_data="form" :current_page="cryptoTransCurrentPage" :per_page="cryptoTransPerPage" :total_pages="cryptoTransTotalPages" :last_page="cryptoTransLastPage"></pagination>
                            <pagination v-else :action="'cryptoWalletStore/getTransactions'" :current_page="cryptoTransCurrentPage" :per_page="cryptoTransPerPage" :total_pages="cryptoTransTotalPages" :last_page="cryptoTransLastPage"></pagination>
                        </template>
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
import pagination from '@/components/BasePagination.vue';
import {notification} from '@/util/notification'
export default {

    data(){
        return{
            isSearching:false,
            isSearchingWallet:false,

            walletSearchForm: {
                date_from:'',
                date_to:'',
                query:''
            },

            transSearchForm: {
                date_from:'',
                date_to:'',
                query:''
            },
        }
    },

    components:{
        pagination
    },

    computed:{
        ...mapState({
                loading:state=>state.loading,
                submitting:state=>state.submitting
            }),

        ...mapGetters('cryptoWalletStore',['cryptoAddresses','cryptoTransactions',
        'cryptoTransCurrentPage','cryptoTransLastPage','cryptoTransPerPage','cryptoTransTotalPages',
        'cryptoAddressCurrentPage','cryptoAddressLastPage','cryptoAddressPerPage','cryptoAddressTotalPages'
            ]),
    },

    created(){
        //if(this.cryptoCoins==null) this.getCoins()
        
        if(this.cryptoAddresses.length==0) this.getAllAddresses()

        if(this.cryptoTransactions.length==0) this.getTransactions()
    },

    methods:{
        ...mapActions('cryptoWalletStore',['getAllAddresses','getTransactions','searchWallet','searchTransactions']),

        searchAddress(){
            this.searchWallet({data:this.walletSearchForm,user_uuid:null})
        },

        searchTrans(){
            this.searchTransactions({data:this.transSearchForm,user_uuid:null})
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

        // submit(){
        //     let strSplit = this.form.assetId.split(':')
        //     this.form.assetId = strSplit[0]
        //     this.form.networkChain = strSplit[1]
        //     this.createAddress(this.form)
        // },
    }
}
</script>
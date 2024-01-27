<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h5>BFREE Wallet Account System</h5>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-8">
                <div class="card mb-3">
                    <img src="/assets/img/wallet.jpg" class="img-responsive" height="320">
                </div>
            </div>
            <div class="col-md-4">
                <div class="card text-white bg-primary mb-3 no-b">
                    <div class="card-header"><b>BEFREE WALLET SYSTEM</b></div>
                    <div class="card-body ">
                        <h5 class="card-title">NOTE !!!</h5>
                        <p class="card-text">Your Wallet is Like a virtual bank to house your funds.
                            Funding your wallet gives you the avenue to create and fund your virtual cards.
                            We currently support USD wallet currency.
                        </p>
                    </div>
                    <div class="card-footer p-1">
                            <div class="col-sm-12">
                                <button class="btn btn-sm bg-white float-right mb-2" v-b-modal.balanceAnalysis>Wallet balance details</button>
                            </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <div class="card mb-2">
                    <div class="card-header white">
                        <strong> Wallet Analysis </strong>
                    </div>
                    <div class="card-body p-0">
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <i class="icon icon-plus-square text-blue"></i> Wallet ID
                                <span class="float-right btn btn-primary btn-sm p-1">{{walletAccount ? walletAccount.account_id : 'N/A'}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="icon icon-plus-square text-blue"></i> Wallet Currency
                                <span class="float-right btn btn-primary btn-sm p-1">{{walletAccount ? walletAccount.currency : 'N/A'}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="icon icon-multiline_chart text-yellow"></i>Total Transactions
                                <span class="float-right btn btn-warning btn-sm p-1">{{userWalletTransactions ? userWalletTransactions.length : 0}}</span>
                            </li>
                            <li class="list-group-item">
                                <i class="icon icon-home text-purple"></i>Wallet Balance
                                <span class="float-right btn btn-warning btn-sm p-1">{{walletAccount ? walletAccount.balance : 0}}</span>
                            </li>
                            
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card">
                    <div class="card-header white">
                        <strong> Wallet Account </strong>
                    </div>
                    <div class="card-body">
                        <!-- Big Heading -->
                        <div class="text-center">
                            <h3 class="my-3">${{walletAccount ? walletAccount.balance : 0}}</h3>
                            <i class="icon-angle-double-up yellow avatar cirlce"></i>
                        </div>
                        <div class="d-flex justify-content-between">
                            <div>
                                <p>
                                    <i class="icon-circle-o text-red mr-2"></i>Outflows</p>
                                <p>
                                    <i class="icon-circle-o text-green mr-2"></i>Inflows</p>
                            </div>
                            <div>
                                <p>
                                    <i class="icon-angle-double-down text-red mr-2"></i>{{inflowOutFlow.outflow ?? 'N/A'}}</p>
                                <p>
                                    <i class="icon-angle-double-up text-green mr-2"></i>{{inflowOutFlow.inflow ?? 'N/A'}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card mb-2">
                    <div class="card-header">
                        <strong>{{walletAccount ? 'Fund Wallet' : 'Create & Fund Wallet'}}</strong>
                    </div>
                    <div class="card-body text-white bg-primary p-2">
                        <h5 class="card-title">NOTE !!!</h5>
                        <p class="card-text">
                            Create or copy your crypto wallet address to
                            fund your USD wallet.
                        </p>
                        <div class="card-footer p-1">
                            <div class="col-sm-12">
                                <button class="btn btn-sm bg-white float-left mb-2" v-b-modal.cryptoWalletInfoModal>Instruction</button>
                                <button class="btn btn-sm bg-white float-right mb-2" v-b-modal.cryptoWalletModal>Create Crypto Address</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br/>

        <div class="card" id="profile" role="tabpanel">
            <div class="card-header">
                <h6>Wallet Transactions</h6>
            </div>
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover table-bordered">
                        <tr>
                            <th><strong>S/N</strong></th>
                            <th>Amount</th>
                            <th>Fee</th>
                            <th>Type</th>
                            <th>Currency</th>
                            <th>Status</th>
                            <th>Narration</th>
                            <th>Transaction reference</th>
                            <th>Date</th>
                        </tr> 
                         
                        <tr v-if="loading">
                            <td colspan="9">
                                <b-skeleton-table
                                    :rows="5"
                                    :columns="8"
                                    :table-props="{ bordered: true, striped: true }"
                                ></b-skeleton-table>
                            </td>
                        </tr>
                        <template v-else>
                            <tr v-if="userWalletTransactions.length == 0">
                                <td colspan="9">There are no wallet account transactions</td>
                            </tr>
                            <tr v-else v-for="transaction,i in userWalletTransactions" :key="i">
                                <td>{{((walletTransCurrentPage-1)*walletTransPerPage)+i+1}}</td>
                                <td>{{transaction.amount}}</td>
                                <td>{{transaction.fee}}</td>
                                <td>{{transaction.txn_type}}</td>
                                <td>{{transaction.currency}}</td>
                                <td>{{transaction.txn_status}}</td>
                                <td>{{transaction.narration}}</td>
                                <td>{{transaction.txn_reference}}</td>
                                <td>{{transaction.created_at}}</td>
                            </tr>
                        </template>                                                                                                                                                                                                                                                                   
                    </table>
                </div>
                <br>
                    <pagination action="transactionStore/getUserWalletTransactions" 
                    :current_page="walletTransCurrentPage" :last_page="walletTransLastPage" :per_page="walletTransPerPage" :total_pages="walletTransTotalPages"></pagination>
            </div>
        </div>

        <!-- <modal :modalId="'fundWallet'" :modalTitle="'Fund Wallet'" :modalSize="'sm'">
            <fund-wallet @wallet-funded="getUserWalletDetails()"/>
        </modal> -->

        <modal :modalId="'cryptoWalletModal'" :modalTitle="'Crypto Wallet'" :modalSize="'lg'">
            <create-wallet/>
        </modal>
        
        <modal :modalId="'cryptoWalletInfoModal'" :modalTitle="'Instruction'" :modalSize="'md'">
            <div class="card">
                <div class="card-header"><b>How to create/fund Your crypto wallet</b></div>
                <div class="card-body">
                    <p class="card-text">
                        <strong>Create</strong> : To create a crypto wallet, click
                        <u>Create Crypto Address</u> button and select a coin(USDT or USDC) from
                        the dropdown. Then select your prefered network chain from Asset chain
                        dropdown, the submit.<br>
                        
                        <strong>Funding</strong> : To fund your crypto wallet, copy one of
                        your created wallet address to a crypto transaction platform and initiate, 
                        you should see the transaction on the cypto transaction table. The converted column,
                        when successful, signifies that your fund had been converted to USD. otherwise, 
                        You will get notified when conversion happens.
                    </p>
                </div>
            </div>
        </modal>

        <modal :modalId="'balanceAnalysis'" :modalTitle="'Balance Analysis'" :modalSize="'lg'">
            <template v-if="!balanceAnalysis">
                <b-skeleton-table
                    :rows="5"
                    :columns="7"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
            </template>
            <balance-analysis v-else :transactions="balanceAnalysis"/>
        </modal>
        
    </div>
</template>



<script>
    import {mapActions,mapGetters,mapState} from 'vuex'
    //import Connect from '@mono.co/connect.js'
    //import fundWallet from '@/components/wallet-account/fundWallet.vue'
    import balanceAnalysis from '@/components/wallet-account/balanceAnalysis.vue'
    import modal from '@/components/Modal.vue'
    //import api from '../../api/payments'
    //import {notification} from '@/util/notification'
    import pagination from '@/components/BasePagination'
    import createWallet from '@/components/crypto-wallet/createWallet'
    
    export default {
        name:'user-wallet-account',
        components:{
            //fundWallet,
            modal,
            balanceAnalysis,
            pagination,
            createWallet
        },
        data(){
            return {
                fundWalletForm:{
                    amount:0,
                    currency:'USD'
                },
                //liveRate:0,
                //convertedAmount:this.liveRate * this.amount
            }
        },

        computed:{
            ...mapState({
                loading:state=>state.loading,
                submitting:state=>state.submitting
            }),

            //...mapGetters('walletAccountStore',['walletAccount','balance','transactions']),
            ...mapGetters('transactionStore',['userWalletTransactions',
            'walletTransCurrentPage','walletTransLastPage',
            'walletTransPerPage','walletTransTotalPages']),
            ...mapGetters('walletAccountStore',['walletAccount','inflowOutFlow','balanceAnalysis']),
            ...mapGetters('productServiceStore',['procuctService']),
            ...mapGetters('userStore',['profile']),
        },

        created(){

            // if(this.profile == null || Object.entries(this.profile).length == 0){
            //     this.getProfileDetails().then(res=>{
            //         if(!res.data.data){
            //             this.$router.push({name:'user-profile'})
            //             notification.warning("You need to update your profile to contiue")
            //             return
            //         }
            //     })
            // }

            if(this.userWalletTransactions.length == 0){
                this.getUserWalletTransactions()
            }

            if(this.walletAccount !== null && Object.entries(this.walletAccount).length == 0){
                this.getUserWalletDetails().then(res=>{    
                    if(res.status == 200 && res.data.data){
                        this.getInflowOutFlow(res.data.data.account_reference)
                        this.getBalanceAnalysis(res.data.data.account_reference)
                    }
                })
            }

            
        }, 
        
        methods:{
            ...mapActions('transactionStore',['getUserWalletTransactions']),
            ...mapActions('walletAccountStore',['getUserWalletDetails','getInflowOutFlow','getBalanceAnalysis']),
            ...mapActions("productServiceStore", ["getDefaultService"]),
            ...mapActions('userStore',['getProfileDetails']),
            
            createWallet(){
                this.create(this.fundWalletForm)
            },

            getResults(page) {
                if (typeof page === 'undefined') {
                    page = 1;
                }

                this.getUserWalletTransactions(page)
      
                // this.$http.get('/categories?page=' + page)
                //     .then(response => {
                //         return response.json();
                //     }).then(data => {
                //         this.laravelData = data;
                //     });
            }
        }
    }
</script>
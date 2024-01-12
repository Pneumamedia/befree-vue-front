<template>
    <div>
        <div class="row">
            <div class="col-md-8">
                <div class="card mb-3">
                    <div class="card-header white">
                        <h6> Virtual Cards </h6>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card mb-3">
                    <button class="btn btn-primary" v-b-modal.createCard>Transactions</button>
                </div>
            </div>
        </div>

        <div class="row text-white no-gutters no-m shadow">
            <div class="col-lg-4">
                <div class="blue p-40">
                    <div class="float-right">
                        <span class="icon icon-password s-48"></span>
                    </div>
                    <template v-if="loading">...</template>
                    <div v-else class="text-large"><b>4</b></div>
                    <h6 class="counter-title">Total Cards</h6>
                </div>
            </div>    
            <div class="col-lg-4">
                <div class="green  p-40">
                    <div class="float-right">
                        <span class="icon icon-male s-48"></span>
                    </div>
                    <template v-if="loading">...</template>
                    <div v-else class="sc-counter s-36">4</div>
                    <h6 class="counter-title">Cards Transactions</h6>
                </div>
            </div>
            <div class="col-lg-4">
                <div class="sunfollower counter-box p-40">
                    <div class="float-right">
                        <span class="icon icon-wallet s-48"></span>
                    </div>
                    <template v-if="loading">...</template>
                    <div v-else class="sc-counter s-36">4</div>
                    <h6 class="counter-title">Total Balance $</h6>
                </div>
            </div>
        </div>

        <div class="card" id="profile" role="tabpanel">
            <div class="card-body">
                <div class="table-responsive">
                    <table class="table table-hover table-bordered">
                        <tr>
                            <th><strong>S/N</strong></th>
                            <th>Amount</th>
                            <th>Currency</th>
                            <th>Narration</th>
                            <th>Transaction reference</th>
                            <th>Date</th>
                        </tr> 
                         
                        <tr v-if="loading">
                            <td colspan="5">
                                <b-skeleton-table
                                    :rows="5"
                                    :columns="5"
                                    :table-props="{ bordered: true, striped: true }"
                                ></b-skeleton-table>
                            </td>
                        </tr>
                        <template v-else>
                            <tr v-if="userVirtualCardTransactions.length == 0">
                                <td colspan="7">There are no virtual account transactions</td>
                            </tr>
                            <tr v-else v-for="transaction,i in userVirtualCardTransactions" :key="i">
                            <td>{{++i}}</td>
                            <td>{{transaction.amount}}</td>
                            <td>{{transaction.currency}}</td>
                            <td>{{transaction.narration}}</td>
                            <td>{{transaction.txn_reference}}</td>
                            <td>{{transaction.created_at}}</td>
                        </tr>
                        </template>                                                       
                                                                                                                                                                                                                                          
                    </table>
                </div>
            </div>
        </div>

        <modal :modalId="'createCard'" :modalTitle="'Create Card'" :modalSize="'sm'">
            <create-virtual-card @card-created="getUserVirtualCardTransactions()"/>
        </modal>
        
    </div>
</template>



<script>
    import {mapActions,mapGetters,mapState} from 'vuex'
    //import Connect from '@mono.co/connect.js'
    import createVirtualCard from '@/components/virtual-card/createCard.vue'
    import modal from '@/components/Modal.vue'
    //import api from '../../api/payments'
    //import {notification} from '@/util/notification'
    //import vm from '../../main'
    
    export default {
        name:'user-virtual-card',
        components:{
            createVirtualCard,
            modal
        },
        data(){
            return {
                fundWalletForm:{
                    amount:0,
                    currency:'USD'
                },
            }
        },

        computed:{
            ...mapState({
                loading:state=>state.loading,
                submitting:state=>state.submitting
            }),

            //...mapGetters('walletAccountStore',['walletAccount','balance','transactions']),
            ...mapGetters('transactionStore',['userVirtualCardTransactions']),
            //...mapGetters('walletAccountStore',['walletAccount'])
        },

        created(){
            if(this.userVirtualCardTransactions.length == 0){
                this.getUserVirtualCardTransactions()
            }
        }, 
        
        methods:{
            ...mapActions('transactionStore',['getUserVirtualCardTransactions']),
            //...mapActions('walletAccountStore',['getUserWalletDetails']),
            //...mapActions('paymentStore',['initiate']),

            // initiateFund(data){
            //     this.initiate(data).then(res=>{
            //         if(res.data.data.status == 200){
            //             const connect = new Connect({ 
            //                 key: process.env.VUE_APP_MONO_PUBLIC_KEY,//'test_pk_2TugdCxELHccsWCaUUHD', //process.env.VUE_MONO_PUBLIC_KEY ,
            //                 scope: "payments",
            //                 payment_type: "onetime-debit",
            //                 data: {
            //                     payment_id: res.data.data.payment_link,
            //                 },
            //                 onSuccess: function({code}){
            //                     console.log("auth code", code)
            //                     // mono.create({code:code}).then(res=>{
            //                     //     if(res.status == 200){
            //                     //         notification.success('Account connected successfully')
            //                     //     }
            //                     // }).catch(err=>{
            //                     //     if(err.response.status == 500){
            //                     //         notification.error('An error occured')
            //                     //     }else{
            //                     //         notification.error(err.response.data.message)
            //                     //     }
            //                     // })
            //                 },
            //                 onLoad: () => console.log("widget loaded successfully")
            //             });

            //            connect.setup();
            //            connect.open();
            //         }
            //     })
            // },



            createWallet(){
                this.create(this.fundWalletForm)
            },
        }
    }
</script>
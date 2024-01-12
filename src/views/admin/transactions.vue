<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h4>Transactions</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card" id="profile" role="tabpanel">
                    <div class="card-header">
                        <h4>Wallet Transactions</h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th><strong>S/N</strong></th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Currency</th>
                                    <th>Status</th>
                                    <th>Narration</th>
                                    <th>Transaction reference</th>
                                    <th>Date</th>
                                </tr> 
                                
                                <tr v-if="loading">
                                    <td colspan="7">
                                        <b-skeleton-table
                                            :rows="5"
                                            :columns="7"
                                            :table-props="{ bordered: true, striped: true }"
                                        ></b-skeleton-table>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr v-if="userWalletTransactions.length == 0">
                                        <td colspan="7">There are no wallet account transactions</td>
                                    </tr>
                                    <tr v-else v-for="transaction,i in userWalletTransactions" :key="i">
                                        <td>{{++i}}</td>
                                        <td>{{transaction.amount}}</td>
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
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
    import { mapState, mapGetters, mapActions } from 'vuex';
    export default{
        name:"users-transactions",
        data(){
            return {}
        },

        computed:{
            ...mapState({
                loading:state=>state.loading
            }),
            ...mapGetters('transactionStore',['transctions']),
        },
        
        created(){
            if(this.transactions.length == 0){
                this.getTransactions()
            }
        },

        methods:{
            ...mapActions('transactionStore',['getTransactions']),
        }
    }
</script>
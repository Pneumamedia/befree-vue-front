<template>
    <div>
        <div class="row">
            <div class="col-md-12">
                <div class="card mb-3">
                    <div class="card-header">
                        <h4>Profit Calculation</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card" id="profile" role="tabpanel">
                    <div class="card-header">
                        <h5>Total Profit - ${{ totalSystemFeesCharge }}</h5>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th><strong>S/N</strong></th>
                                    <th>Amount</th>
                                    <th>Source</th>
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
                                            :columns="7"
                                            :table-props="{ bordered: true, striped: true }"
                                        ></b-skeleton-table>
                                    </td>
                                </tr>
                                <template v-else>
                                    <tr v-if="systemFeesCharge.length == 0">
                                        <td colspan="9">There are no transactions</td>
                                    </tr>
                                    <tr v-else v-for="transaction,i in systemFeesCharge" :key="i">
                                        <td>{{++i}}</td>
                                        <td>{{transaction.fee}}</td>
                                        <td>{{transaction.txn_source}}</td>
                                        <td>{{transaction.txn_type}}</td>
                                        <td>{{transaction.currency}}</td>
                                        <td>{{transaction.txn_status}}</td>
                                        <td>{{transaction.narration}}</td>
                                        <td>{{transaction.txn_reference}}</td>
                                        <td>{{transaction.created_at}}</td>
                                    </tr>
                                    <tr v-if="totalSystemFeesCharge == null">
                                        <td colspan="9">...loading</td>
                                    </tr>
                                    <tr v-else>
                                        <td colspan="8">Total</td>
                                        <td>${{ totalSystemFeesCharge }}</td>
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
        name:"profit-calculation",
        data(){
            return {}
        },

        computed:{
            ...mapState({
                loading:state=>state.loading
            }),
            ...mapGetters('transactionStore',['systemFeesCharge','totalSystemFeesCharge']),
        },
        
        created(){
            if(this.systemFeesCharge.length == 0){
                this.getSystemFeesCharge()
            }
            if(this.totalSystemFeesCharge == null){
                this.getTotalSystemFeesCharge()
            }
        },

        methods:{
            ...mapActions('transactionStore',['getSystemFeesCharge','getTotalSystemFeesCharge']),
        }
    }
</script>
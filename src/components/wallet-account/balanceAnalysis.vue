<template>
    <div class="row">
            <div class="col-md-12">
                <div class="card" role="tabpanel">
                    <div class="card-header">
                        <h4>Wallet Balance Analysis</h4>
                    </div>
                    <div class="card-body">
                        <div class="table-responsive">
                            <table class="table table-hover table-bordered">
                                <tr>
                                    <th>S/N</th>
                                    <th>Amount</th>
                                    <th>Fee</th>
                                    <th>Currency</th>
                                    <th>Type</th>
                                    <th>Narration</th>
                                    <th>Balance before</th>
                                    <th>Balance after</th>
                                    <th>Date</th>
                                </tr> 
                            
                                <tr v-if="transactions.length == 0">
                                    <td colspan="7">There are no balance analysis</td>
                                </tr>
                                <template v-else>
                                    <tr v-for="transaction,i in transactions" :key="i">
                                        <td>{{++i}}</td>
                                        <td>{{transaction.amount}}</td>
                                        <td>{{transaction.fee}}</td>
                                        <td>{{transaction.currency}}</td>
                                        <td>{{transaction.type}}</td>
                                        <td>{{transaction.narration}}</td>
                                        <td>{{transaction.balance_before}}</td>
                                        <td>{{transaction.balance_after}}</td>
                                        <td>{{transaction.created_at}}</td>
                                    </tr>
                                </template>
                                                                                                                                                                                                                                                                                      
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>

<script>
    export default {
        props:{
            transactions:{
                type:Array,
                required:true
            }
        }
    }
</script>
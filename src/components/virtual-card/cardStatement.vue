<template>
    <div>
        <div v-if="card.is_blocked==1" class="row">
            <div class="col-md-12">
                <div class="alert alert-danger">
                    This Card has been Blocked. Please reachout to surpport for more details
                </div>
            </div>
        </div>

        <div v-else-if="card.status=='terminated'" class="row">
            <div class="col-md-12">
                <div class="alert alert-danger">
                    This Card has been Terminated.
                </div>
            </div>
        </div>

        <div v-else class="row">
            <div class="col-md-12">
                <form id="searchForm" @submit.prevent="submit()">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-md-4">
                                   From Date : <input type="date" v-model="date_from" class="form-control " style=""  placeholder="Date from ">
                                </div>

                                <div class="col-md-4">
                                   To Date : <input type="date" v-model="date_to" class="form-control " style=""  placeholder="Date to">
                                </div><br>
                                <div class="col-md-4">
                                    <div>&nbsp;</div>
                                    <button type="submit" id="submit" class="btn btn-primary">Generate&nbsp;&nbsp;<i class="icon-search"></i></button>
                                </div>
                            </div>
                        </div>      
                    </div>
                </form>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <div class="card" role="tabpanel">
                    <div class="card-header">
                        <h5>Virtual Card Statement</h5>
                        <download-button v-if="cardStatementSummary !== null" dom="#print-card-statement" name="card-statement.pdf" class="btn btn-primary pull-right">Download&nbsp;&nbsp;<i class="icon-download"></i></download-button>
                    </div>
                    <div id="print-card-statement">
                        <b-card v-if="vCardLoading">
                            <b-skeleton animation="throb" width="85%"></b-skeleton>
                            <b-skeleton animation="throb" width="55%"></b-skeleton>
                            <b-skeleton animation="throb" width="70%"></b-skeleton>
                            <b-skeleton animation="throb" width="85%"></b-skeleton>
                            <b-skeleton animation="throb" width="55%"></b-skeleton>
                            <b-skeleton animation="throb" width="70%"></b-skeleton>
                        </b-card>
                        <div v-else class="card-body">
                            <div class="acc_substatement2" id="acc_substatement2">
                                <div class="acc_substatement2_logo">
                                    <img src="/img/bfree.png" alt="Bfree logo">
                                </div>
                                <div class="acc_substatement2_head">YOUR BFREE ACCOUNT STATEMENT</div>
                                <br>
                                <b-card v-if="vCardLoading">
                                    <b-skeleton animation="throb" width="85%"></b-skeleton>
                                    <b-skeleton animation="throb" width="55%"></b-skeleton>
                                    <b-skeleton animation="throb" width="70%"></b-skeleton>
                                </b-card>
                                <div v-else class="acc_substatement2_body">
                                    <div class="acc_substatement2_body_con1_mainText">
                                        <div class="con1_text">
                                            <b>Name: </b>{{ authUser.first_name }} {{ authUser.last_name }}
                                        </div>
                                        <div class="con1_text">
                                            <b>Email Address: </b>{{ authUser.email }}
                                        </div>
                                        <div class="con1_text">
                                            <b>Card: </b>{{ card.card_number }}
                                        </div>
                                        <div class="con1_text">
                                            <b>Currency: </b>{{ card.currency }}
                                        </div>
                                        <span class="con1_text">
                                            <b>Balance: </b> {{ card.balance }}
                                        </span>
                                    </div>
                                </div>

                                <hr>
                                
                                <div class="card-header">
                                    <div class="acc_substatement2_subtableHead">
                                        <span v-if="date_from" class="tableHead_text1">
                                            <b>From :</b> {{ date_from }}
                                        </span>
                                        
                                        <span v-if="date_to" class="tableHead_text1">
                                        <b> To :</b> {{ date_to }}
                                        </span>
                                    </div>
                                </div>
                                
                                <table class="table table-hover table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Narration</th>
                                        <th>Transaction Details</th>
                                        <th>($)Credit</th>
                                        <th>($)Debit</th>
                                        <th>Status</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-if="transLoading">
                                            <td colspan="6">
                                                <b-skeleton-table
                                                    :rows="3"
                                                    :columns="6"
                                                    :table-props="{ bordered: true, striped: true }"
                                                ></b-skeleton-table>
                                            </td>
                                        </tr>
                                        <template v-else>
                                            <tr v-if="cardStatement.length==0">
                                                <td colspan="6">The are no transaction in selected periods</td>
                                            </tr>
                                            <tr v-else v-for="statement,i in cardStatement" :key="i">
                                                <td>{{ statement.created_at }}</td>
                                                <td>{{ statement.narration }}</td>
                                                <td>{{ statement.txn_type }} transaction</td>
                                                <td>
                                                    <div v-if="statement.txn_type == 'credit'">
                                                        {{ statement.amount }}
                                                    </div> 
                                                </td>
                                                <td>
                                                    <div class="text-danger" v-if="statement.txn_type == 'debit'">
                                                    - {{ statement.amount }}
                                                    </div> 
                                                </td>
                                                    
                                                <td>
                                                    {{ statement.txn_status }}
                                                </td>
                                            </tr>
                                        </template>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        
                        
                            <div class="card-header">
                                <h5>Statement Summary</h5>
                            </div>
                            <b-card v-if="summaryLoading">
                                <b-skeleton animation="throb" width="85%"></b-skeleton>
                                <b-skeleton animation="throb" width="55%"></b-skeleton>
                                <b-skeleton animation="throb" width="70%"></b-skeleton>
                            </b-card>
                            <div v-else>
                                <table v-if="cardStatementSummary !== null" class="table table-hover table-bordered">
                                    <thead>
                                    <tr>
                                        <th>Transactions</th>
                                        <th colspan="5">{{ cardStatementSummary.total_transaction }}</th>
                                    </tr>
                                    <tr>
                                        <th>Credits</th>
                                        <th colspan="5">${{ cardStatementSummary.credit_sum }}</th>
                                    </tr>
                                    <tr>
                                        <th>Debits</th>
                                        <th colspan="5">${{ cardStatementSummary.debit_sum }}</th>
                                    </tr>
                                    </thead>
                                </table>
                            </div>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.acc_statement .acc_substatement .acc_substatement2 {
    width: 100%;
    border: 1px solid #A6A6A6;
    height: auto;
    padding: 20px;
    margin-bottom: 20px;
}


</style>

<script>
//import fundCard from '@/components/virtual-card/fundCard.vue'
import {mapActions,mapState,mapGetters} from 'vuex'
import downloadButton from '@/components/downloadButton.vue'
export default {
    components:{
        downloadButton
    },
    props:{
        card:{
            type:Object,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false,
            required:false
        },
        
    },
    data(){
        return {
            vCardLoading:false,
            transLoading:false,
            summaryLoading:false,
            date_from:null,
            date_to:null
        }
    },

    computed:{
    ...mapState({
        loading:(state)=>state.loading,
        submitting:(state)=>state.submitting
        }),

        ...mapGetters('virtualCardStore',['cardStatement','virtualCardDetails','cardStatementSummary']),
        ...mapGetters('authStore',['authUser'])
    },

    created(){
        //console.log('card-details',this.card)
        if(this.card){
            //this.virtualCardDetails = this.card
            this.vCardLoading = true
            
            this.getCardDetails(this.card.reference).then(()=>{
                this.vCardLoading = false
            })

            
            if(this.authUser.email == undefined){
                this.getUser()
            }
        }
    },

    methods:{
        ...mapActions('virtualCardStore',['getCardStatement','getCardDetails','getCardStatementSummary']),
        ...mapActions('authStore',['getUser']),

        submit(){
            this.transLoading = true
            this.summaryLoading = true
            let data = {cardId:this.card.reference,date_from:this.date_from,date_to:this.date_to}
            this.getCardStatement(data).then(()=>{
                this.transLoading = false
            })
            this.getCardStatementSummary(data).then(()=>{
                this.summaryLoading = false
            })
        },

    }
}
</script>
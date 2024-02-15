<template>
    <div>
        <div class="card mb-3">
            <div class="card-header white">
                <h6> YOUR ACTIVITIES </h6>
            </div>
        </div>

        <div class="">
            <b-card v-if="Object.entries(this.authUser).length == 0 || loading" >
                <b-skeleton animation="throb" width="85%"></b-skeleton>
                <b-skeleton animation="throb" width="55%"></b-skeleton>
                <b-skeleton animation="throb" width="70%"></b-skeleton>
            </b-card>
            <activity-panel v-else :user="authUser" :wallet="walletAccount" :cards="userVirtualCards" :cardTransactionCount="userVirtualCardTransactions.length"/>
        </div>
			<!--Style End 3-->
			
        <div class="d-flex row row-eq-height my-3">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header white">
                        <div class="row justify-content-end">
                            <div class="col">
                                <ul class="nav nav-tabs card-header-tabs nav-material">
                                    <li class="nav-item">
                                        <a class="nav-link text-blue" id="w1-tab1" data-toggle="tab" >Recent Virtual Cards</a>
                                    </li>	
                                </ul>
                                
                            </div>
                        </div>
                    </div>
                    <div class="card-body no-p">
                        <div class="tab-content">
                            <div class="tab-pane show active" id="v-pills-w1-tab1" role="tabpanel" aria-labelledby="v-pills-w1-tab1">
                                <div class="row p-3">
                                    <div class="col-md-12 table-responsive">
                                        <table class="table table-hover table-bordered">
                                            <tr>
                                                <th><strong>S/N</strong></th>
                                                <th>Card Id</th>
                                                <th>Title</th>
                                                <th>Status</th>
                                                <th>Brand</th>
                                                <th>Name</th>
                                                <th>Currency</th>
                                                <th>Card Number</th>
                                                <!-- <th>Expiry Month</th>
                                                <th>Expiry Year</th> -->
                                                <th>Actions</th>
                                            </tr> 
                                            
                                            <tr v-if="loading">
                                                <td colspan="10">
                                                    <b-skeleton-table
                                                        :rows="5"
                                                        :columns="9"
                                                        :table-props="{ bordered: true, striped: true }"
                                                    ></b-skeleton-table>
                                                </td>
                                            </tr>
                                            <template v-else>
                                                <tr v-if="userVirtualCards.length == 0">
                                                    <td colspan="9">There are no virtual cards</td>
                                                </tr>
                                                <tr v-else v-for="card,i in userVirtualCards.slice(0,5)" :key="i">
                                                <td>{{++i}}</td>
                                                <td>{{card.reference}}</td>
                                                <td>{{card.card_title}}</td>
                                                <td>{{card.status}}</td>
                                                <td>{{card.brand}}</td>
                                                <td>{{card.name_on_card}}</td>
                                                <td>{{card.currency}}</td>
                                                <td>{{card.masked_card_number}}</td>
                                                <!-- <td>{{card.expiry_month}}</td>
                                                <td>{{card.expiry_year}}</td> -->
                                                <td>
                                                    <div class="dropdown">
                                                        <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                        </button>
                                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                            <a data-id="6" v-b-modal.cardDetails @click="setCard(card)"  class="dropdown-item approve">Details</a>
                                                            <!-- <a data-id="6"  class="dropdown-item">Freeze</a>
                                                            <a data-id="6"  class="dropdown-item">Terminate</a> -->
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            </template>                                                                                                                                                                                                                                                              
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>	
                </div>
            </div>
        </div>
			
        <div class="d-flex row row-eq-height my-3">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-header white">
                        <div class="row justify-content-end">
                            <div class="col">
                                <ul class="nav nav-tabs card-header-tabs nav-material">
                                    <li class="nav-item">
                                        <a class="nav-link text-blue" id="w1-tab1" data-toggle="tab" >Recent Virtual Card Transactions</a>
                                    </li>	
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="card-body no-p">
                        <div class="tab-content">
                            <div class="tab-pane animated show active" id="v-pills-w1-tab1" role="tabpanel" aria-labelledby="v-pills-w1-tab1">
                                <div class="row p-3">
                                    <div class="col-md-12">
                                    
                                        <div class="card-body pb-" id="pending">
                                            <ul class="list-group">
                                                <li class=" list-group-item d-flex justify-content-between align-items-center">
                                                    <a href="" class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapse1" aria-expanded="true" aria-controls="collapseOne">View Transactions</a>
                                                    <template v-if="loading">...</template>
                                                    <a v-else href="#pending" class="btn badge badge-primary badge-pill">{{userVirtualCardTransactions.length}}</a>
                                                </li>												   
                                            </ul>
                                        </div>
                                        <div id="collapse1" class="collapse hidden col-lg-12" aria-labelledby="headingOne" data-parent="#accordionExample" style="">
                                            <div class="tab-content">
                                                <div class="tab-pane active" id="home" role="tabpanel">
                                                    <div class="">
                                                        <div class="table-responsive">
                                                            <table class="table table-bordered">
                                                                <tr>
                                                                    <th><strong>S/N</strong></th>
                                                                    <th>Amount</th>
                                                                    <th>Type</th>
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
                                                                        <td colspan="7">There are no virtual card transactions</td>
                                                                    </tr>
                                                                    <template v-else>
                                                                        <tr v-for="transaction,i in userVirtualCardTransactions.slice(0,5)" :key="i">
                                                                            <td>{{++i}}</td>
                                                                            <td>{{transaction.amount}}</td>
                                                                            <td>{{transaction.txn_type}}</td>
                                                                            <td>{{transaction.currency}}</td>
                                                                            <td>{{transaction.narration}}</td>
                                                                            <td>{{transaction.txn_reference}}</td>
                                                                            <td>{{transaction.created_at}}</td>
                                                                        </tr>
                                                                    </template>
                                                                </template>   
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>
        </div>     
    </div>
</template>

<script>
import {mapState,mapActions,mapGetters} from 'vuex'
import activityPanel from '@/components/user/activityPanel'
//import frontPageMessage from '@/components/admin/frontPageMessage'
//import pendingOrders from '@/components/admin/pendingOrders'
export default {
    name:"user-dashboard",
    components:{
        activityPanel,
        //frontPageMessage,
        //pendingOrders
    },
    data(){
        return{
            key:''
        }
    },

    computed:{
        ...mapState({
            loading:state=>state.loading
        }),
        //...mapGetters(),
        //...mapGetters('loanStore',['borrowedLoans','recentPayments']),
        ...mapGetters('authStore',['authUser']),
        ...mapGetters('transactionStore',['userVirtualCardTransactions']),
        ...mapGetters('walletAccountStore',['walletAccount']),
        ...mapGetters('virtualCardStore',['userVirtualCards']),
    },

    created(){
        //var that = this
        // if(Object.entries(this.authUser).length == 0){
        //     this.getUser().then(function(){
        //     })
        // }
        if(this.userVirtualCardTransactions.length == 0){
            this.getUserVirtualCardTransactions()
        }
        if(this.walletAccount){
            this.getUserWalletDetails()
        }

        if(this.userVirtualCards.length == 0){
            this.getUserCards()
        }
        
    },

    methods:{
        ...mapActions('authStore',['getUser']),
        ...mapActions('transactionStore',['getUserVirtualCardTransactions']),
        ...mapActions('walletAccountStore',['getUserWalletDetails']),
        ...mapActions('virtualCardStore',['getUserCards']),
    }
}
</script>
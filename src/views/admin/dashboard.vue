<template>
    <div>
        <div class="card mb-3">
            <div class="card-header white">
                <h6> YOUR ACTIVITIES </h6>
            </div>
        </div>

        <div class="">
            <b-card v-if="loading || !totalUsers || !totalActiveUsers || !totalCards || !totalWalletBalance">
                <b-skeleton animation="throb" width="85%"></b-skeleton>
                <b-skeleton animation="throb" width="55%"></b-skeleton>
                <b-skeleton animation="throb" width="70%"></b-skeleton>
            </b-card>
            <activity-panel v-else :totalUsers="totalUsers" :totalActiveUsers="totalActiveUsers"
             :totalCards="totalCards" :totalInactiveUsers="totalInactiveUsers"  :totalWalletBalance="totalWalletBalance"/>
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
                                        <a class="nav-link text-blue" id="w1-tab1" data-toggle="tab" >Recent Registrations</a>
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
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Phone</th>
                                                <th>Country</th>
                                                <th>State</th>
                                                <th>Date</th>
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
                                                <tr v-if="activeUsers.length == 0">
                                                    <td colspan="9">There are no recent registrations</td>
                                                </tr>
                                                <tr v-else v-for="user,i in activeUsers.slice(0,5)" :key="i">
                                                    <td>{{++i}}</td>
                                                    <td>{{user.first_name}} {{user.last_name}}</td>
                                                    <td>{{user.email}}</td>
                                                    <td>{{user.phone}}</td>
                                                    <td>{{user.country}}</td>
                                                    <td>{{user.state}}</td>
                                                    <td>{{user.created_at}}</td>
                                                    <td>
                                                        <div class="dropdown">
                                                            <button class="btn btn-sm btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                            </button>
                                                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton" style="position:relative">
                                                                <a data-id="6" v-b-modal.cardDetails class="dropdown-item approve">Profile</a>
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
                                        <a class="nav-link text-blue" id="w1-tab1" data-toggle="tab" >Recent Users Transactions</a>
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
                                                    <a v-else href="#pending" class="btn badge badge-primary badge-pill">{{allTransactions.length}}</a>
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
                                                                    <tr v-if="allTransactions.length == 0">
                                                                        <td colspan="7">There are no transactions</td>
                                                                    </tr>
                                                                    <template v-else>
                                                                        <tr v-for="transaction,i in allTransactions.slice(0,5)" :key="i">
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
import activityPanel from '@/components/admin/activityPanel'
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
            
        }
    },

    computed:{
        ...mapState({
            loading:state=>state.loading
        }),
        
        ...mapGetters('authStore',['authUser']),
        ...mapGetters('walletAccountStore',['totalWalletBalance']),
        ...mapGetters('virtualCardStore',['totalCards']),
        ...mapGetters('userStore',['totalUsers','totalActiveUsers','activeUsers',
        'inactiveUsers','totalInactiveUsers']),
        ...mapGetters('transactionStore',['allTransactions']),
    },

    created(){
        this.getTotalInactiveUsers()
        //var that = this
        if(Object.entries(this.authUser).length == 0){
            this.getAdmin().then(function(){
            })
        }

        if(!this.totalUsers){
            this.getTotalUsers()
        }
        if(!this.totalActiveUsers){
            this.getTotalActiveUsers()
        }
        if(!this.totalCards){
            this.getTotalCards()
        }
        if(!this.totalWalletBalance){
            this.getTotalWalletBalance().then(()=>{
                console.log(this.totalWalletBalance)
            })
        }

        if(this.allTransactions.length == 0){
            this.getAllTransactions()
        }

        if(this.activeUsers.length==0){
            this.getActiveUsers()
       }

      


        
    },

    methods:{
        ...mapActions('authStore',['getAdmin']),
        ...mapActions('userStore',['getTotalUsers','getTotalActiveUsers','getTotalInactiveUsers',
        'getActiveUsers','getInactiveUsers']),
        ...mapActions('transactionStore',['getAllTransactions']),
        ...mapActions('walletAccountStore',['getTotalWalletBalance']),
        ...mapActions('virtualCardStore',['getTotalCards']),
    }
}
</script>